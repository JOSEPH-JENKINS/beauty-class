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
            <button class="Button Button__dark" @click="startCheckout(event)">
              book a spot
            </button>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { allEventsQuery } from "@/queries/events";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "#app";

const { data: events } = await useSanityQuery(allEventsQuery);
const now = new Date();
const router = useRouter();
const route = useRoute();

// Filter current events based on the date
const currentEvents = computed(() =>
  events.value.filter((ev) => new Date(ev.date) >= now)
);

// Format the event date into a human-readable string
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

// Checkout function
async function startCheckout(event) {
  // Ensure price exists and is a valid number
  const priceInCents = event.price
    ? Math.round(parseFloat(event.price) * 100)
    : 0;

  // Log to verify the data
  console.log("Event Data:", {
    title: event.title,
    price: priceInCents,
    currency: "usd",
    eventId: event._id,
  });

  try {
    // Make the request to your server API to initiate Stripe Checkout
    const result = await $fetch("/api/checkout", {
      method: "POST",
      body: {
        title: event.title,
        price: priceInCents,
        currency: "usd", // USD currency
        eventId: event._id, // Optional: track event
      },
    });

    if (result) {
      // Redirect to Stripe Checkout if URL is returned
      window.location.href = result.url;
    } else {
      console.error("No URL returned from the checkout API.");
    }
  } catch (err) {
    console.error("API Request failed:", err);
  }
}

onMounted(() => {
  if (route.query.paymentSuccess === "true") {
    alert("Thank you for your purchase!");
  }
});
</script>
