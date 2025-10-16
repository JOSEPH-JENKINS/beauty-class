// server/api/subscribe.post.ts
export default defineEventHandler(async (event) => {
  // Get the email from the request body
  const { email } = await readBody(event);

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    });
  }

  // Get Mailchimp credentials from runtime config
  const { mailchimpApiKey, mailchimpServerPrefix, mailchimpAudienceId } = useRuntimeConfig();

  // Construct the Mailchimp API URL
  const url = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`;

  try {
    // Send the request to the Mailchimp API
    const response = await $fetch(url, {
      method: 'POST',
      headers: {
        // Mailchimp requires a 'Basic' auth header. The username can be anything.
        Authorization: `Basic ${Buffer.from(`anystring:${mailchimpApiKey}`).toString('base64')}`,
      },
      body: {
        email_address: email,
        status: 'subscribed', // Subscribe the user directly
      },
    });

    // Return a success message
    return { message: 'Successfully subscribed!' };

  } catch (error: any) {
    console.error('Mailchimp API Error:', error.data);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.data?.detail || 'An error occurred.',
    });
  }
});
