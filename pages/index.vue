<template>
  <div>
    <HeroSection v-if="sections.heroSection" :content="sections.heroSection" />
    <AboutSection
      v-if="sections.aboutSection"
      :content="sections.aboutSection"
    />
    <FeaturedPosts v-if="postsData" :content="postsData" />
    <SoftCtaSection
      v-if="sections.softCtaSection"
      :content="sections.softCtaSection"
    />
    <InstagramSection
      :content="sections.instagramSection"
      v-if="sections.instagramSection"
    />
    <BrandLogoCarousel
      v-if="sections.brandsSection"
      :logos="sections.brandsSection.logos"
      :speed="60"
    />
    <TestimonialSection
      v-if="sections.testimonialSection"
      :content="sections.testimonialSection"
    />
    <EventModal v-if="sections.modalSection" :content="sections.modalSection" />
  </div>
</template>

<script setup>
import { homepageQuery } from "@/queries/homepage";
import { featuredPostsQuery } from "@/queries/blog";
import { computed } from "vue";
import AboutSection from "~/components/AboutSection.vue";

const { data } = useSanityQuery(homepageQuery);
const { data: postsData } = useSanityQuery(featuredPostsQuery);

// Process the pageBuilder array into a structured object once.
// This is more efficient and scalable.
const sections = computed(() => {
  if (!data.value?.pageBuilder) return {};
  return data.value.pageBuilder.reduce((acc, section) => {
    acc[section._type] = section;
    return acc;
  }, {});
});
</script>
