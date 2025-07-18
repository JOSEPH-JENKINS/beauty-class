<template>
  <section>
    <section
      class="Hero"
      style="height: calc(84svh - (84svh * 1 / 4))"
      v-if="heroSection"
    >
      <div class="Hero-background">
        <img :src="eventPage.image.asset.url" :alt="eventPage.heading" />
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
              <NuxtLink :to="`/events/${event.slug.current}`">
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
              <NuxtLink class="Button" :to="`/events/${event.slug.current}`"
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
        <h1 class="u-hSize--Medium">class in photo</h1>
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
                  <img
                    :src="`${post.image.asset.url}?w=400&h=400&auto=format&fit=crop&q=75`"
                    alt="Instagram post"
                  />
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

const selectedFilter = ref("all");

const { data: events } = useSanityQuery(allEventsWithTestimonialsQuery);
const { data: eventPage } = useSanityQuery(eventPageQuery);
const { data: homepage } = useSanityQuery(homepageQuery);

const heroVideoRef = ref(null);
const isVideoPlaying = ref(true);

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

const filteredEvents = computed(() => {
  if (!events.value) return [];

  const now = new Date();

  // step 1: filter out past events
  const upcomingEvents = events.value.filter((event) => {
    if (!event?.date) return false;

    const eventDate = new Date(event.date);
    return eventDate >= now;
  });

  // step 2: filter by selected event type
  if (selectedFilter.value === "all") {
    return upcomingEvents;
  }

  return upcomingEvents.filter(
    (event) => event?.eventType === selectedFilter.value
  );
});

const homepageTestimonials = computed(() => {
  if (!homepage.value || !homepage.value.pageBuilder) {
    return [];
  }
  const testimonialSection = homepage.value.pageBuilder.find(
    (section) => section._type === "testimonialSection"
  );
  return testimonialSection;
});

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
