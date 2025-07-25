<template>
  <section class="testimonial-section">
    <div class="testimonial-section__image-wrapper">
      <img
        v-if="content?.mainImage"
        :src="`${content.mainImage.asset.url}?auto=format&q=90`"
        loading="lazy"
        alt="Testimonial image"
        class="testimonial-section__image"
      />
    </div>
    <div class="testimonial-section__content">
      <article
        v-for="testimonial in content.testimonials"
        :key="testimonial._id"
        class="testimonial-card"
      >
        <p class="testimonial-card__quote">"{{ testimonial.quote }}"</p>
        <p class="testimonial-card__author">
          {{ testimonial.name }}, {{ testimonial.role }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { urlFor } from "~/composables/useImageBuilder";

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});

// Set the initial image URL from the first testimonial.
const activeImageUrl = ref(
  props.content?.testimonials?.[0]?.image?.asset?.url ||
    "/placeholder-image.jpg"
);
</script>
