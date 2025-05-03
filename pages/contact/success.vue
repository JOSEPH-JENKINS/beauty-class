<template>
  <div class="contact-section">
    <div class="contact-wrapper">
      <h1 class="contact-title">{{ contact.heading }}</h1>
      <div class="contact-description">
        <p class="contact-title">thanks for contacting us.</p>
      </div>
      <NuxtLink to="/" class="Button Button__dark">Return Home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { contactQuery } from "@/queries/contact";

const { data: contact } = useSanityQuery(contactQuery);
</script>
