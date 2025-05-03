<template>
  <div>
    <HeroSection v-if="heroSection" :content="heroSection" />
    <FeaturedPosts v-if="postsData" :content="postsData" />
    <SoftCtaSection v-if="softCtaSection" :content="softCtaSection" />
    <BrandLogoCarousel
      v-if="brandsSection"
      :logos="brandsSection.logos"
      :speed="25"
    />
    <TestimonialSection
      v-if="testimonialSection"
      :content="testimonialSection"
    />
    <EventModal v-if="modalSection" :content="modalSection" />
  </div>
</template>

<script setup>
import { homepageQuery } from "@/queries/homepage";
import { featuredPostsQuery } from "@/queries/blog";

const { data } = useSanityQuery(homepageQuery);
const { data: postsData } = useSanityQuery(featuredPostsQuery);

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

const brandsSection = computed(() => {
  return data.value?.pageBuilder?.find(
    (section) => section._type === "brandsSection"
  );
});

const modalSection = computed(() => {
  return data.value?.pageBuilder?.find(
    (section) => section._type === "modalSection"
  );
});
</script>
