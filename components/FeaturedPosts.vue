<template>
  <section class="testimonial-section">
    <div class="section-header text-center">
      <h1 data-splitting="lines" style="font-weight: 400">
        <p>Featured Posts</p>
      </h1>
    </div>
    <div class="collection-slider">
      <div class="custom-cursor-wrapper">
        <div class="swiper swiper-pointer-events">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide collection-slide"
              v-for="post in content"
              :key="post._id"
            >
              <NuxtLink :to="`/blog/${post.slug.current}`">
                <article class="content-card">
                  <div class="card-content">
                    <div class="card-image fixed-height">
                      <img
                        :src="post.coverImage.asset.url"
                        :alt="post.excerpt"
                        class="card-image"
                      />
                    </div>
                    <div class="card-info">
                      <div class="content-title-wrapper">
                        <h2 class="u-noMargin">
                          {{ post.title }}
                        </h2>
                        <p>{{ post.excerpt }}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </NuxtLink>
            </div>
          </div>
        </div>
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
