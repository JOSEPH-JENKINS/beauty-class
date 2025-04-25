<template>
  <div v-if="show" class="modal-overlay" @click.self="show = false">
    <div class="modal-content">
      <h2>{{ data.heading }}</h2>
      <p>{{ data.subtext }}</p>
      <NuxtLink :to="data.ctaLink" class="Button">{{ data.ctaLabel }}</NuxtLink>
      <button class="close-btn" @click="show = false">Close</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});

const show = ref(true);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  max-width: 90%;
  width: 400px;
}
.close-btn {
  margin-top: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
}
</style>
