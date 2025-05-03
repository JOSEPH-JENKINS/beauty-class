<template>
  <section class="Events">
    <section class="Hero bg-black" style="height: 76svh">
      <div class="soft-background">
        <img src="/Rectangle.png" alt="BGradient" />
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>All Events</p>
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
              @click="selectedFilter = 'all'"
              :class="
                selectedFilter === 'all'
                  ? 'Button Button__dark active'
                  : 'Button Button__dark'
              "
            >
              <h1 class="margin-0">all</h1>
            </button>
          </div>
          <div class="Button-container">
            <button
              @click="selectedFilter = 'upcoming'"
              :class="
                selectedFilter === 'upcoming'
                  ? 'Button Button__dark active'
                  : 'Button Button__dark'
              "
            >
              <h1 class="margin-0">upcoming</h1>
            </button>
          </div>
          <div class="Button-container">
            <button
              @click="selectedFilter = 'past'"
              :class="
                selectedFilter === 'past'
                  ? 'Button Button__dark active'
                  : 'Button Button__dark'
              "
            >
              <h1 class="margin-0">past</h1>
            </button>
          </div>
        </div>
      </div>
      <div class="Blog-container-articles">
        <div v-if="filteredEvents.length === 0">
          <h1>no upcoming events to see.</h1>
          <div class="Button-container">
            <button
              class="Button Button__dark"
              @click="selectedFilter = 'past'"
            >
              see past events
            </button>
          </div>
        </div>
        <article
          v-for="event in filteredEvents"
          :key="event._id"
          class="BlogListItem"
        >
          <div class="Image-container">
            <div class="Custom-wrapper">
              <div class="image">
                <span
                  class="Image Image--desktop o-placeholder bg-full-height"
                  style="
                    box-sizing: border-box;
                    display: block;
                    overflow: hidden;
                    background: none;
                    opacity: 1;
                    border: 0px;
                    margin: 0px;
                    padding: 0px;
                    transform: translate3d(0px, 0px, 0px) scale(1.031, 1.03099);
                  "
                >
                  <span
                    style="
                      box-sizing: border-box;
                      display: block;
                      width: initial;
                      height: initial;
                      background: none;
                      opacity: 1;
                      border: 0px;
                      margin: 0px;

                      padding-bottom: 56.25%;
                    "
                  ></span>
                  <img
                    class="ls-is-cached lazyloaded"
                    :src="event.image.asset.url"
                    decoding="async"
                    data-nimg="responsive"
                    sizes="100vw"
                    :alt="event.title"
                    loading="lazy"
                    style="
                      position: absolute;
                      inset: 0px;
                      box-sizing: border-box;
                      padding: 0px;
                      border: none;
                      margin: auto;
                      display: block;
                      width: 0px;
                      height: 0px;
                      min-width: 100%;
                      max-width: 100%;
                      min-height: 100%;
                      max-height: 100%;
                      object-fit: cover;
                      object-position: top center;
                    "
                /></span>
              </div>
            </div>
          </div>
          <div class="BlogListItem-link">
            <div class="BlogListItem-link">
              <h1
                class="BlogListItem-title margin-bottom u-bold u-pSize u-pSize__Medium"
              >
                <NuxtLink :to="`/events/${event.slug.current}`">{{
                  event.title
                }}</NuxtLink>
              </h1>
              <p
                class="BlogListItem-content margin-bottom u-pSize u-pSize__Small"
              >
                {{ event.excerpt }}
              </p>
              <div class="Button-container">
                <NuxtLink
                  class="Button Button__dark"
                  :to="`/events/${event.slug.current}`"
                  >read more</NuxtLink
                >
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
  <section class="EventTestimonials" v-if="testimonialEvents.length">
    <div class="section-header text-center brand">
      <h1 data-splitting="lines" style="font-weight: 400">
        <p>what attendies said</p>
      </h1>
    </div>
    <div
      v-for="event in testimonialEvents"
      :key="event._id"
      class="testimonial-event-wrapper"
    >
      <NuxtLink :to="`/events/${event.slug.current}`"
        ><h3>{{ event.title }}</h3></NuxtLink
      >
      <div class="collection-slider">
        <div class="custom-cursor-wrapper">
          <div class="swiper swiper-pointer-events">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide collection-slide"
                v-for="testimonial in event.testimonials"
                :key="testimonial._id"
              >
                <article class="content-card">
                  <div class="card-content event">
                    <div class="card-image fixed-height">
                      <img
                        :src="testimonial.image.asset.url"
                        :alt="testimonial.quote"
                        class="card-image"
                      />
                    </div>
                    <div class="card-info">
                      <div class="content-title-wrapper">
                        <h2 class="u-noMargin">
                          {{ testimonial.quote }}
                        </h2>
                        <p>{{ testimonial.name }}, {{ testimonial.role }}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { allEventsWithTestimonialsQuery } from "@/queries/events";
import { computed } from "vue";

const selectedFilter = ref("all");

const { data: events } = useSanityQuery(allEventsWithTestimonialsQuery);
const now = new Date();

const upcomingEvents = computed(() =>
  events.value.filter((ev) => new Date(ev.date) >= now)
);
const pastEvents = computed(() =>
  events.value.filter((ev) => new Date(ev.date) < now)
);

const testimonialEvents = computed(() =>
  events.value.filter((ev) => ev.testimonials?.length)
);

const filteredEvents = computed(() => {
  if (selectedFilter.value === "upcoming") return upcomingEvents.value;
  if (selectedFilter.value === "past") return pastEvents.value;
  return events.value;
});
</script>
