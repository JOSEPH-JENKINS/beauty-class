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

const { data: contact } = useSanityQuery(contactQuery);

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
