<template>
  <div>
    <HeroSection v-if="heroSection" :content="heroSection" />
  </div>
</template>

<script setup>
import { homepageQuery } from "@/queries/homepage";

const { data } = useSanityQuery(homepageQuery);

// Extract hero section
const heroSection = computed(() => {
  return data.value?.pageBuilder?.find(
    (section) => section._type === "heroSection"
  );
});
</script>
