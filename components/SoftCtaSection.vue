<template>
  <div class="soft-cta-container">
    <div class="soft-background">
      <img
        v-if="content.backgroundImage && content.backgroundImage.asset"
        :src="`${content.backgroundImage.asset.url}?w=1200&auto=format&q=75`"
        alt="Soft CTA background"
        loading="lazy"
      />
    </div>
    <div class="soft-cta-content">
      <div class="soft-cta-logo">
        <img
          v-if="content.logo?.asset?.url"
          :src="content.logo.asset.url"
          alt="CTA Section Logo"
        />
      </div>
      <div class="soft-cta-paragraph">
        <p>{{ content.paragraph }}</p>
      </div>
      <div class="Button-container">
        <!-- Using Button__hero for white text/border on a dark background -->
        <NuxtLink
          class="Button Button__hero"
          :to="content.ctaLink"
          data-mode="default"
        >
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

<style scoped>
.soft-cta-paragraph {
  width: 85%;
  margin: 0 auto;
}

.soft-cta-paragraph p {
  color: #fff;
}

@media (min-width: 768px) {
  .soft-cta-paragraph {
    width: 50%;
  }
}
</style>
