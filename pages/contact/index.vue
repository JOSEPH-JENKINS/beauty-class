<template>
  <div class="contact-section">
    <div class="contact-wrapper">
      <h1 class="contact-title">{{ contact.heading }}</h1>
      <div class="contact-description">
        <PortableText :value="contact.body" />
      </div>
      <form action="post" class="contact-form" @submit.prevent="sendMessage">
        <div class="contact-input-wrapper js-input-wrapper">
          <input
            type="text"
            name="name"
            placeholder="First and Last Name*"
            required=""
            v-model="name"
            aria-required="true"
            class="contact-input js-form-input"
          />
        </div>
        <div class="contact-input-wrapper js-input-wrapper">
          <input
            type="email"
            name="email"
            required=""
            v-model="emailContact"
            aria-required="true"
            placeholder="Email*"
            class="contact-input js-form-input"
          />
        </div>
        <div class="contact-input-wrapper js-input-wrapper">
          <textarea
            name="message"
            placeholder="Tell us the details.*"
            required=""
            v-model="message"
            aria-required="true"
            style="resize: none"
            class="contact-textarea contact-input js-form-input"
          ></textarea>
        </div>
        <div class="Button-container">
          <button
            class="Button filter u-pSize Button__dark Button__large Button__fullWidth js-form-submit"
            type="submit"
          >
            <h1 class="margin-0 uppercase">Submit</h1>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { contactQuery } from "@/queries/contact";
import { PortableText } from "@portabletext/vue";
const router = useRouter();
const route = useRoute();

const { data: contact } = await useAsyncData(
  `contact-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(contactQuery);
    return data.value; // unwraps the ref before returning
  }
);

definePageMeta({
  prerender: true,
  isr: 300,
});

useHead(() => {
  const title = contact.value?.heading || "Contact Us";
  const description =
    contact.value?.body?.[0]?.children?.[0]?.text ||
    "Reach out and let’s get the conversation started.";
  const image = "/placeholder-image.jpg"; // optional fallback, swap with your brand OG image
  const url = "https://beauty-class.co.uk/contact"; // change to your real domain

  return {
    title,
    meta: [
      { name: "description", content: description },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
});

import { ref } from "vue";

const name = ref("");
const emailContact = ref("");
const message = ref("");

let messageSent = ref(false);

function sendMessage() {
  messageSent.value = true;
  name.value = "";
  emailContact.value = "";
  message.value = "";

  router.push("/contact/success");
}
</script>
