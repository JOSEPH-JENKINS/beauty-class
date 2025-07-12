<template>
  <section class="testimonial-section">
    <div class="testimonial-section__image-wrapper">
      <Transition name="fade" mode="out-in">
        <img
          :key="activeImageUrl"
          v-if="activeImageUrl"
          :src="`${activeImageUrl}?w=800&auto=format&q=75`"
          alt="Testimonial image"
          class="testimonial-section__image"
        />
      </Transition>
    </div>
    <div class="testimonial-section__content">
      <article
        v-for="testimonial in content.testimonials"
        :key="testimonial._id"
        class="testimonial-card"
        @mouseover="setActiveImage(testimonial)"
      >
        <h2 class="testimonial-card__quote">"{{ testimonial.quote }}""</h2>
        <p class="testimonial-card__author">
          {{ testimonial.name }}, {{ testimonial.role }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});

// Set the initial image URL from the first testimonial.
const activeImageUrl = ref(
  props.content?.testimonials?.[0]?.image?.asset?.url || ""
);

// Function to update the image URL on hover.
function setActiveImage(testimonial) {
  if (testimonial?.image?.asset?.url) {
    activeImageUrl.value = testimonial.image.asset.url;
  }
}
</script>
