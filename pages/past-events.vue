<template>
  <section class="Events">
    <section class="Hero bg-black" style="height: 76svh">
      <div class="soft-background">
        <img src="/Rectangle.png" alt="BGradient" />
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>Past Events</p>
          </h1>
        </div>
      </div>
    </section>
    <section class="Events">
      <div v-for="event in pastEvents" class="Event" :key="event._id">
        <div class="event-img">
          <img
            width="100"
            height="100"
            :src="event.image.asset.url"
            :alt="event.title"
          />
        </div>
        <div class="event-info">
          <h1>{{ event.title }}</h1>
          <p>{{ event.excerpt }}</p>
          <p>{{ formatDateTime(event.date) }}</p>
          <p>{{ event.location }}</p>
        </div>
        <div v-if="event.testimonials?.length" class="EventTestimonials">
          <h3>What Attendees Said</h3>
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
                            <p>
                              {{ testimonial.name }}, {{ testimonial.role }}
                            </p>
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
      </div>
    </section>
  </section>
</template>

<script setup>
import { allEventsWithTestimonialsQuery } from "@/queries/events";

import { computed } from "vue";
const { data: events } = await useSanityQuery(allEventsWithTestimonialsQuery);
const now = new Date();
const pastEvents = computed(() =>
  events.value.filter((ev) => new Date(ev.date) < now)
);

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
</script>
