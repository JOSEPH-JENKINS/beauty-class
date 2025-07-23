<template>
  <section class="about-section" v-if="content?.post">
    <div class="about-section__image">
      <img
        v-if="content.post.coverImage?.asset?.url"
        :src="`${content.post.coverImage.asset.url}?auto=format&q=90`"
        :alt="content.post.title || 'Featured blog post image'"
        loading="lazy"
      />
    </div>
    <div class="about-section__content">
      <p class="category">{{ content.post.category.title }}</p>
      <h2 style="margin-bottom: 1rem">
        {{ content.post.title }}
      </h2>
      <p v-if="content.post.excerpt">{{ content.post.excerpt }}</p>
      <div class="Button-container">
        <NuxtLink :to="`/journal/${content.post.slug.current}`" class="Button">
          read more
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

.about-section {
  margin-bottom: var(--section-spacing) !important;
}
</style>
