<template>
  <section class="Events">
    <section class="Hero bg-black" style="height: 76svh">
      <div class="soft-background">
        <img src="/Rectangle.png" alt="BGradient" />
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>Available Events</p>
          </h1>
        </div>
      </div>
    </section>
    <section class="Events">
      <div v-for="event in currentEvents" class="Event" :key="event._id">
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
          <p>{{ event.description }}</p>
          <p>{{ formatDateTime(event.date) }}</p>
          <p>{{ event.location }}</p>
          <div class="Button-container">
            <NuxtLink class="Button Button__dark" :to="event.eventbriteLink">
              book a spot
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { allEventsQuery } from "@/queries/events";

import { computed } from "vue";
const { data: events } = await useSanityQuery(allEventsQuery);
const now = new Date();
const currentEvents = computed(() =>
  events.value.filter((ev) => new Date(ev.date) >= now)
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
