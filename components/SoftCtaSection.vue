<template>
  <div class="soft-cta-container">
    <div class="soft-background">
      <img src="/Rectangle.png" alt="BGradient" />
    </div>
    <div class="soft-cta-content">
      <div class="soft-cta-title">
        <h1>{{ content.heading }}</h1>
      </div>
      <div class="soft-cta-paragraph">
        <p>{{ content.paragraph }}</p>
      </div>
      <div class="Button-container">
        <NuxtLink class="Button Button__dark" to="/events" data-mode="default">
          {{ content.ctaLabel }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>
