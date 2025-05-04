<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close" @click="close">CLOSE</button>

      <div class="image-nav-wrapper">
        <button class="nav-button left" @click="prev" :disabled="index === 0">
          PREV
        </button>

        <div class="modal-image">
          <img :src="artist.image.asset.url" :alt="artist.name" />
          <div class="modal-details">
            <h2>{{ artist.name }}</h2>
            <p>{{ artist.subheading }}</p>
          </div>
        </div>

        <button
          class="nav-button right"
          @click="next"
          :disabled="index === artists.length - 1"
        >
          NEXT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    console.log(props.index);
  }
}

function prev() {
  if (props.index > 0) emit("update:index", props.index - 1);
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
}

.modal-content {
  background: #fff;
  padding: 2rem;
  width: 85vw;
  max-width: 1000px;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.image-nav-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.modal-image {
  max-height: 60vh;
  max-width: 60vw;
  /* overflow: hidden; */
  border-radius: 6px;
  position: relative;
}

.modal-image img {
  display: block;
  height: 100%;
  max-height: 60vh;
  width: auto;
  object-fit: contain;
  border-radius: 6px;
}

.nav-button {
  background: none;
  border: none;
  font-size: 100%;
  cursor: pointer;
  color: #333;
}

.nav-button:hover,
.close:hover {
  color: #d683b6;
}

.nav-button:disabled {
  color: #bbb;
  cursor: not-allowed;
}

.modal-details {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateX(110%);
  z-index: 2;
}

.modal-details h2 {
  margin: 0;
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 100%;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
