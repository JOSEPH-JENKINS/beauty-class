<template>
  <section>
    <section class="Hero" style="height: 84svh" v-if="heroSection">
      <div class="Hero-background">
        <video
          ref="heroVideoRef"
          autoplay="autoplay"
          playsinline=""
          loop="true"
          muted=""
          :src="heroSection.video.asset.url"
          aria-hidden="true"
          class="heroVideo"
        ></video>
        <div
          class="video-play-pause"
          data-desktop-alignment="right"
          data-mobile-alignment="right"
          @click="videoBtnClick()"
        >
          <button
            type="button"
            class="play"
            :class="{ hidden: isVideoPlaying }"
            aria-label="Play video"
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15.5"
                cy="15.5"
                r="15"
                fill="rgba(0,0,0,0)"
                stroke="#ffffff"
              ></circle>
              <path
                d="M22 16L11.5 22.0622L11.5 9.93782L22 16Z"
                fill="#ffffff"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="pause"
            :class="{ hidden: !isVideoPlaying }"
            aria-label="Pause video"
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15.5"
                cy="15.5"
                r="15"
                fill="rgba(0,0,0,0)"
                stroke="#ffffff"
              ></circle>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 10H11V21H14V10ZM20 10H17V21H20V10Z"
                fill="#ffffff"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>class in session</p>
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
import { allEventsWithTestimonialsQuery } from "@/queries/events";
import { homepageQuery } from "@/queries/homepage";
import { computed, ref } from "vue";

const selectedFilter = ref("all");

const { data: events } = useSanityQuery(allEventsWithTestimonialsQuery);
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
  if (!events.value) {
    return [];
  }

  // If 'all' is selected, return all events.
  if (selectedFilter.value === "all") {
    return events.value;
  }

  // Otherwise, filter by the selected eventType.
  return events.value.filter(
    (event) => event && event.eventType === selectedFilter.value
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
