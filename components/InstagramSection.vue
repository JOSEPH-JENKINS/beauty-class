<template>
  <section
    class="instagram-section"
    style="margin-bottom: var(--section-spacing)"
  >
    <div class="instagram-section__container">
      <div class="instagram-section__header section-header">
        <h1 class="heroFontSize">{{ content.heading }}</h1>
        <NuxtLink :to="content.ctaLink" class="Button desktop-cta">
          {{ content.ctaLabel }}
        </NuxtLink>
      </div>
      <div class="collection-slider">
        <div class="swiper swiper-pointer-events">
          <div class="swiper-wrapper">
            <div
              v-for="(post, index) in content.posts"
              :key="index"
              class="swiper-slide collection-slide"
            >
              <div class="instagram-post">
                <img
                  :src="`${post.image.asset.url}?auto=format&q=90`"
                  loading="lazy"
                  alt="Instagram post"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-cta">
        <NuxtLink :to="content.ctaLink" class="Button">
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
.instagram-section {
  background-color: #f8f8f8; /* Site's grey color */
  padding: 2.25vw 1rem;
  margin-top: 2.25vw;
  border-radius: 12px;
}

.instagram-section__container {
  margin: 0 auto;
}

.instagram-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.mobile-cta {
  display: none;
  margin: 12px 0;
  width: 100%;
  text-align: center;
}

@media (max-width: 768px) {
  .mobile-cta {
    display: block;
  }
  .desktop-cta {
    display: none;
  }
}
</style>
