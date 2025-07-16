<template>
  <div class="modal-overlay" @click.self="close">
    <div
      class="modal-content"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <button class="close" @click="close">
        <h1 class="uppercase">close</h1>
      </button>

      <!-- Desktop Layout -->
      <div class="desktop-wrapper">
        <button class="nav-button" @click="prev" :disabled="index === 0">
          <h1>prev</h1>
        </button>

        <div class="image-info-wrapper">
          <img
            class="modal-image"
            :src="artist.image.asset.url"
            :alt="artist.name"
          />
          <div class="modal-details">
            <h2>{{ artist.name }}</h2>
            <p>{{ artist.subheading }}</p>
          </div>
        </div>

        <button
          class="nav-button"
          @click="next"
          :disabled="index === artists.length - 1"
        >
          <h1>next</h1>
        </button>
      </div>

      <!-- Mobile Layout -->
      <div class="mobile-wrapper">
        <img
          class="modal-image"
          :src="artist.image.asset.url"
          :alt="artist.name"
        />
        <div class="modal-details">
          <h2>{{ artist.name }}</h2>
          <p>{{ artist.subheading }}</p>
        </div>
        <div class="mobile-nav">
          <button class="nav-button" @click="prev" :disabled="index === 0">
            PREV
          </button>
          <button
            class="nav-button"
            @click="next"
            :disabled="index === artists.length - 1"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  artist: Object,
  index: Number,
  artists: Array,
});

const emit = defineEmits(["close", "update:index"]);

function close() {
  emit("close");
}

function next() {
  if (props.index < props.artists.length - 1) {
    emit("update:index", props.index + 1);
  }
}

function prev() {
  if (props.index > 0) {
    emit("update:index", props.index - 1);
  }
}

// Swipe
const touchStartX = ref(0);
const touchEndX = ref(0);

function onTouchStart(e) {
  touchStartX.value = e.changedTouches[0].screenX;
}

function onTouchEnd(e) {
  touchEndX.value = e.changedTouches[0].screenX;
  const delta = touchEndX.value - touchStartX.value;
  if (Math.abs(delta) > 50) {
    delta > 0 ? prev() : next();
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  background: #fff;
  padding: 2.35rem 2rem 1rem;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: #333 !important;
}

.close:hover {
  color: #d683b6;
}

/* Desktop */
.desktop-wrapper {
  display: none;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.image-info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60vw;
}

.modal-image {
  width: 100%;
  height: auto;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 12px;
}

.modal-details {
  margin-top: 1rem;
  text-align: center;
}

/* Mobile Layout */
.mobile-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.mobile-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-button {
  background: none;
  border: none;
  font-size: 100%;
  cursor: pointer;
  color: #333;
  /* transition: color 0.2s; */
}

.nav-button:hover:not(:disabled) {
  color: #d683b6;
}

.nav-button:disabled {
  /* color: #bbb; */
  cursor: not-allowed;
  /* background-color: #f5f5f5; */
}

/* Responsive Overrides */
@media screen and (min-width: 768px) {
  .desktop-wrapper {
    display: flex;
  }

  .mobile-wrapper {
    display: none;
  }

  .modal-details {
    text-align: center;
  }
}
</style>
