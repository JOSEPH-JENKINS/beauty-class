<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <button class="close" @click="close">×</button>
      <div class="modal-image">
        <img :src="artist.image.asset.url" :alt="artist.name" />
      </div>
      <div class="modal-details">
        <div class="modal-info">
          <h2>{{ artist.name }}</h2>
          <p>{{ artist.subheading }}</p>
        </div>
        <div class="nav-buttons">
          <button @click="prev" :disabled="index === 0">PREV</button>
          <button @click="next" :disabled="index === artists.length - 1">
            NEXT
          </button>
        </div>
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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999 !important;
}
.modal-content {
  display: grid;
  background: #fff;
  padding: 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 1rem;
  height: 90vh;
  position: relative;
  z-index: 9999;
  width: 70vw;
  border-radius: 12px;
}
.modal-image {
  width: auto;
  height: 100%;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}
.modal-image img {
  width: auto;
  height: 100%;
  border-radius: 6px;
}
@media screen and (min-width: 760px) {
  .modal-content {
    grid-template-columns: 1fr 1fr;
    width: 85vw;
  }
}
.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  z-index: 999;
}
.close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.3rem;
  background: #a3a09b;
  color: #fff;
  padding: 5px 1rem;
  line-height: 100%;
  cursor: pointer;
  z-index: 999;
}

.modal-details {
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
}
.nav-buttons button {
  color: #67645e;
  cursor: pointer;
}
.nav-buttons button:hover {
  color: #d683b6;
}
</style>
