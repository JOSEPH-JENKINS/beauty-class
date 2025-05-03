<template>
  <div
    class="modal-overlay"
    :class="{ 'modal-show': isVisible }"
    @click.self="$emit('close')"
  >
    <div class="modal-content">
      <button class="modal-close" @click.self="$emit('close')">×</button>
      <div class="image-container">
        <img v-if="image" :src="image" alt="Modal Image" />
      </div>
      <div class="content">
        <div class="section-header">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>{{ heading }}</p>
          </h1>
        </div>
        <p>{{ subtext }}</p>
        <div class="Button-container">
          <button class="Button Button__dark" to="/events" @click="handleCTA">
            {{ ctaLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  heading: String,
  subtext: String,
  ctaLabel: String,
  image: String,
});

import { ref, onMounted } from "vue";
const isVisible = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true;
  });
});

import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);
const router = useRouter();

function handleCTA() {
  emit("close"); // First, close the modal
  // Delay navigation slightly to allow modal to close visually
  setTimeout(() => {
    router.push("/events");
  }, 100);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  display: grid;
  background: #fff;
  padding: 1rem;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 50vh;
  position: relative;
  width: 70vw;
  border-radius: 12px;
}

.modal-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.3rem;
  background: #a3a09b;
  color: #fff;
  padding: 5px 1rem;
  line-height: 100%;
  cursor: pointer;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.modal-overlay {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none;
}

.modal-show {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
</style>
