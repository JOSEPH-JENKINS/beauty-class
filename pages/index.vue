<template>
  <div>
    <HeroSection v-if="heroSection" :content="heroSection" />
    <TestimonialSection
      v-if="testimonialSection"
      :content="testimonialSection"
    />
    <SoftCtaSection v-if="softCtaSection" :content="softCtaSection" />
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

const testimonialSection = computed(() => {
  return data.value?.pageBuilder?.find(
    (section) => section._type === "testimonialSection"
  );
});

const softCtaSection = computed(() => {
  return data.value?.pageBuilder?.find(
    (section) => section._type === "softCtaSection"
  );
});
</script>
