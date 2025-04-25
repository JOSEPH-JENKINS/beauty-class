<template>
  <div class="contact-section">
    <div class="contact-wrapper">
      <h1 class="contact-title">{{ contact.heading }}</h1>
      <div class="contact-description">
        <p>{{ contact.description }}</p>
      </div>
      <form action="post" class="contact-form">
        <div class="contact-input-wrapper js-input-wrapper">
          <input
            type="text"
            name="name"
            placeholder="First and Last Name*"
            required=""
            aria-required="true"
            class="contact-input js-form-input"
          />
        </div>
        <div class="contact-input-wrapper js-input-wrapper">
          <input
            type="email"
            name="email"
            required=""
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
            aria-required="true"
            style="resize: none"
            class="mod_kustomer_form_SBqyca_Kustomer__textarea mod_kustomer_form_SBqyca_Kustomer__input js-form-input"
          ></textarea>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { contactQuery } from "@/queries/contact";

const { data: contact } = useSanityQuery(contactQuery);
</script>
