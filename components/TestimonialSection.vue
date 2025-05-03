<template>
  <section class="testimonial-section">
    <div class="collection-slider">
      <div class="custom-cursor-wrapper">
        <div class="swiper swiper-pointer-events">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide collection-slide"
              v-for="testimonial in content.testimonials"
              :key="testimonial._id"
            >
              <article class="content-card">
                <div class="card-content">
                  <div class="card-image fixed-height">
                    <img
                      :src="testimonial.image.asset.url"
                      :alt="testimonial.quote"
                      class="card-image"
                    />
                  </div>
                  <div class="card-info">
                    <div class="content-title-wrapper">
                      <h2 class="u-noMargin">
                        {{ testimonial.quote }}
                      </h2>
                      <p>{{ testimonial.name }}, {{ testimonial.role }}</p>
                    </div>
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
