<template>
  <div class="contact-section">
    <div class="contact-wrapper">
      <h1 class="contact-title">{{ contact.heading }}</h1>
      <div class="contact-description">
        <PortableText :value="contact.body" />
      </div>

      <div v-if="messageSent" class="contact-success">
        <h2>Thank you!</h2>
        <p>Your message has been sent successfully. We'll be in touch soon.</p>
      </div>

      <form v-else class="contact-form" @submit.prevent="sendMessage">
        <div class="contact-input-wrapper js-input-wrapper">
          <input
            type="text"
            name="name" placeholder="First and Last Name*"
            required
            v-model="name"
            class="contact-input js-form-input"
          />
        </div>
        <div class="contact-input-wrapper js-input-wrapper">
          <input
            type="email"
            name="email" required
            v-model="emailContact"
            placeholder="Email*"
            class="contact-input js-form-input"
          />
        </div>
        <div class="contact-input-wrapper js-input-wrapper">
          <textarea
            name="message" placeholder="Tell us the details.*"
            required
            v-model="message"
            style="resize: none"
            class="contact-textarea contact-input js-form-input"
          ></textarea>
        </div>
        <div class="Button-container">
          <button
            class="Button filter u-pSize Button__dark Button__large Button__fullWidth js-form-submit"
            type="submit"
            :disabled="isSubmitting"
          >
            <h1 class="margin-0 uppercase">
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
            </h1>
          </button>
        </div>
        <p v-if="errorMessage" style="color: red; margin-top: 1rem;">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { contactQuery } from "@/queries/contact";
import { PortableText } from "@portabletext/vue";
const route = useRoute();

// --- ALL YOUR SANITY AND SEO LOGIC IS UNCHANGED ---
const { data: contact } = await useAsyncData(
  `contact-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(contactQuery);
    return data.value;
  }
);

definePageMeta({ isr: 60 });

useHead(() => {
  const title = contact.value?.heading || "Contact Us";
  const description =
    contact.value?.body?.[0]?.children?.[0]?.text ||
    "Reach out and let’s get the conversation started.";
  const image = "/placeholder-image.jpg";
  const url = "https://beauty-class.co.uk/contact";

  return {
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
});
// ---------------------------------------------------

import { ref } from "vue";

// --- UPDATED SCRIPT LOGIC FOR THE FORM ---
const name = ref("");
const emailContact = ref("");
const message = ref("");
const messageSent = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

async function sendMessage() {
  isSubmitting.value = true;
  errorMessage.value = "";
  try {
    // Call our NEW contact server endpoint
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: name.value,
        email: emailContact.value,
        message: message.value,
      },
    });

    // On success, show the success message
    messageSent.value = true;

  } catch (error) {
    console.error(error);
    errorMessage.value = "Sorry, something went wrong. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* Add a little style for your new success message */
.contact-success {
  padding: 2rem;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
