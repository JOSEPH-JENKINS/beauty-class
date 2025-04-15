<template>
  <div class="py-12 px-6 bg-gray-100 rounded-2xl shadow">
    <h2 class="text-2xl font-semibold mb-6">{{ title }}</h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial._id"
        class="bg-white p-4 rounded-xl shadow-sm"
      >
        <img
          v-if="testimonial.image?.asset?.url"
          :src="testimonial.image.asset.url"
          :alt="testimonial.name"
          class="w-12 h-12 rounded-full object-cover mb-2"
        />
        <p class="text-sm text-gray-600 italic mb-2">
          "{{ testimonial.quote }}"
        </p>
        <p class="font-semibold">{{ testimonial.name }}</p>
        <p class="text-xs text-gray-500">{{ testimonial.role }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  testimonials: Array,
});
</script>
