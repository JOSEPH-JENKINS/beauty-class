<template>
  <section>
    <section
      class="Hero"
      style="height: calc(84svh - (84svh * 1 / 4))"
      v-if="heroSection"
    >
      <div class="Hero-background">
        <img :src="eventPage?.image?.asset?.url" :alt="eventPage?.heading" />
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>{{ eventPage.heading }}</p>
          </h1>
        </div>
      </div>
    </section>
    <div class="Blog-container">
      <div class="Blog-container-filters">
        <p class="u-bold u-pSize u-pSize__Medium u-noMargin">filter by:</p>
        <div class="Blog-container-filters-list">
          <div class="Button-container">
            <button
              type="button"
              @click="selectedFilter = 'all'"
              :class="[
                'Button',
                'filter',
                'filter-btn',
                { active: selectedFilter === 'all' },
              ]"
            >
              <h1 class="margin-0">all</h1>
            </button>
          </div>
          <div class="Button-container">
            <button
              type="button"
              @click="selectedFilter = 'online'"
              :class="[
                'Button',
                'filter',
                'filter-btn',
                { active: selectedFilter === 'online' },
              ]"
            >
              <h1 class="margin-0">online</h1>
            </button>
          </div>
          <div class="Button-container">
            <button
              type="button"
              @click="selectedFilter = 'in-person'"
              :class="[
                'Button',
                'filter',
                'filter-btn',
                { active: selectedFilter === 'in-person' },
              ]"
            >
              <h1 class="margin-0">in-person</h1>
            </button>
          </div>
        </div>
      </div>
      <div class="Blog-container-articles">
        <div v-if="filteredEvents.length === 0">
          <h1>No events to see just yet.</h1>
        </div>
        <article
          v-for="event in filteredEvents"
          :key="event._id"
          class="BlogListItem content-card"
        >
          <div class="card-content">
            <div class="card-image fixed-height">
              <NuxtLink :to="`/events/${event?.slug?.current}`">
                <img
                  :src="event.image?.asset?.url || '/placeholder-image.jpg'"
                  :alt="event.title"
                  loading="lazy"
                  class="card-image"
                />
              </NuxtLink>
            </div>
            <div class="card-info">
              <div class="content-title-wrapper">
                <p v-if="event.eventType" class="BlogListItem-content category">
                  {{ event.eventType }}
                </p>
                <h3 class="u-noMargin blog-title">
                  {{ event.title }}
                </h3>
                <p v-if="event.excerpt">
                  {{ event.excerpt }}
                </p>
              </div>
            </div>
            <div class="Button-container">
              <NuxtLink class="Button" :to="`/events/${event?.slug?.current}`"
                >read more</NuxtLink
              >
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
  <section class="instagram-section">
    <div class="instagram-section__container">
      <div class="instagram-section__header section-header">
        <h1 class="heroFontSize">class in photo</h1>
        <NuxtLink to="/about" class="Button"> learn about us </NuxtLink>
      </div>
      <div class="collection-slider">
        <div class="swiper swiper-pointer-events">
          <div class="swiper-wrapper">
            <div
              v-for="(post, index) in content.posts"
              :key="index"
              class="swiper-slide collection-slide"
            >
              <NuxtLink
                :to="post.postUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div class="instagram-post">
                  <img :src="`${post.image.asset.url}`" alt="Instagram post" />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="EventTestimonials" v-if="homepageTestimonials.testimonials">
    <TestimonialSection :content="homepageTestimonials" />
  </section>
</template>

<script setup>
import {
  allEventsWithTestimonialsQuery,
  eventPageQuery,
} from "@/queries/events";
import { homepageQuery } from "@/queries/homepage";
import { computed, ref } from "vue";
const route = useRoute();

definePageMeta({
  isr: 300,
  prerender: true,
});
// filters
const selectedFilter = ref("all");

// ✅ wrap all Sanity queries in useAsyncData
const { data: events } = await useAsyncData(
  `events-${route.fullPath}}`,
  async () => {
    const { data } = await useSanityQuery(allEventsWithTestimonialsQuery);
    return data.value; // unwraps the ref before returning
  }
);

const { data: eventPage } = await useAsyncData(
  `eventPage-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(eventPageQuery);
    return data.value; // unwraps the ref before returning
  }
);

const { data: homepage } = await useAsyncData(
  `homepage-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(homepageQuery);
    return data.value; // unwraps the ref before returning
  }
);

useHead(() => {
  const title = eventPage.value?.heading || "Events";
  const description =
    eventPage.value?.description ||
    "Explore upcoming online and in-person events.";
  const image = eventPage.value?.image?.asset?.url || "/placeholder-image.jpg";

  return {
    title,
    meta: [
      { name: "description", content: description },

      // Open Graph (Facebook, LinkedIn, etc.)
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://beauty-class.co.uk/events" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
});

// hero video logic
const heroVideoRef = ref(null);
const isVideoPlaying = ref(true);

// homepage builder sections
const heroSection = computed(() => {
  return homepage.value?.pageBuilder?.find(
    (section) => section._type === "heroSection"
  );
});

const content = computed(() => {
  return homepage.value?.pageBuilder?.find(
    (section) => section._type === "instagramSection"
  );
});

const homepageTestimonials = computed(() => {
  if (!homepage.value || !homepage.value.pageBuilder) return [];
  return homepage.value.pageBuilder.find(
    (section) => section._type === "testimonialSection"
  );
});

// event filtering
const filteredEvents = computed(() => {
  if (!events.value) return [];

  const now = new Date();

  const upcomingEvents = events.value.filter((event) => {
    if (!event?.date) return false;
    return new Date(event.date) >= now;
  });

  if (selectedFilter.value === "all") return events.value;

  return upcomingEvents.filter(
    (event) => event?.eventType === selectedFilter.value
  );
});

// video play/pause
const videoBtnClick = () => {
  const video = heroVideoRef.value;
  if (!video) return;

  if (video.paused || video.ended) {
    video.play();
    isVideoPlaying.value = true;
  } else {
    video.pause();
    isVideoPlaying.value = false;
  }
};
</script>

<style scoped>
.instagram-section {
  background-color: #f1f0ed; /* Site's grey color */
  padding: 2.25vw 1rem;
  margin-top: 2.25vw;
  border-radius: 12px;
}

.instagram-section__container {
  margin: 0 auto;
}

.instagram-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
