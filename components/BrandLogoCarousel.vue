<template style="margin-bottom: var(--section-spacing)">
  <div
    class="section-header text-center brand"
    style="margin-top: var(--section-spacing)"
  >
    <p data-splitting="lines">Trusted by</p>
  </div>
  <div class="brand-carousel" ref="carousel">
    <div class="track" :style="{ animationDuration: speed + 's' }">
      <div class="slide" v-for="(logo, index) in doubledLogos" :key="index">
        <img :src="logo.asset.url" :alt="'Brand logo ' + index" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  logos: Array,
  speed: {
    type: Number,
    default: 20, // seconds to complete one loop
  },
});

// Duplicate logos to allow seamless infinite scroll
const doubledLogos = [...props.logos, ...props.logos];
</script>

<style scoped>
.brand-carousel {
  overflow: hidden;
  width: 100%;
  background: white;
  margin: 2rem 0 4rem;
}

.track {
  display: flex;
  width: max-content;
  animation: scroll linear infinite;
}

.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .slide {
    min-width: 120px;
    padding: 0 0.75rem;
  }
}

.slide img {
  height: 32px;
  object-fit: contain;
  /* filter: grayscale(100%); */
  opacity: 0.8;
}

@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
