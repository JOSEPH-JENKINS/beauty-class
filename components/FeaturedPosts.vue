<template>
  <section class="featured-section">
    <div class="collection-slider">
      <div class="custom-cursor-wrapper">
        <div class="swiper swiper-pointer-events">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide collection-slide"
              v-for="post in content"
              :key="post._id"
            >
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
                      <p class="BlogListItem-content category">
                        {{ post.category.title }}
                      </p>
                      <h3 class="u-noMargin">
                        {{ post.title }}
                      </h3>
                      <p v-if="post.excerpt">{{ post.excerpt }}</p>
                    </div>
                  </div>
                  <div class="Button-container">
                    <NuxtLink
                      class="Button filter Button__dark"
                      :to="`/blog/${post.slug.current}`"
                      >read more</NuxtLink
                    >
                  </div>
                </div>
              </article>
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
