// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  // Read the fields from the request body
  const { email, name, message } = await readBody(event);

  if (!email || !name || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  // Get Mailchimp credentials from runtime config (same as before)
  const { mailchimpApiKey, mailchimpServerPrefix, mailchimpAudienceId } = useRuntimeConfig();

  const url = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`;

  try {
    // Send the request to the Mailchimp API
    // Note the new 'merge_fields' and 'tags' properties
    await $fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${mailchimpApiKey}`).toString('base64')}`,
      },
      body: {
        email_address: email,
        status: 'subscribed',
        // This object passes the extra data to your Mailchimp fields
        merge_fields: {
          MMERGE8: name,    // First and Last Name
          MMERGE7: message, // Message
        },
        // We'll add a descriptive tag
        tags: ["Contact Form Submission"]
      },
    });

    return { message: 'Contact form submitted successfully!' };

  } catch (error: any) {
    console.error('Mailchimp API Error:', error.data);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || 'An error occurred.',
    });
  }
});
