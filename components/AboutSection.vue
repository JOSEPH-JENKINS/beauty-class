<template>
  <section class="about-section">
    <div class="about-section__image">
      <img
        v-if="content.image && content.image.asset"
        :src="`${content.image.asset.url}?w=800&auto=format&q=75`"
        :alt="content.heading || 'About section image'"
        loading="lazy"
      />
    </div>
    <div class="about-section__content">
      <p class="category">features</p>
      <h2 v-if="content.heading" style="margin-bottom: 1rem">
        {{ content.heading }}
      </h2>
      <p v-if="content.excerpt">{{ content.excerpt }}</p>
      <div class="Button-container" v-if="content.ctaLabel">
        <NuxtLink to="/about" class="Button">
          {{ content.ctaLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.category {
  text-transform: uppercase;
  color: #888;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}
</style>
