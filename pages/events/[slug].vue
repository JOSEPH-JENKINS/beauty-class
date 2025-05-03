<template>
  <section class="Post">
    <div class="post-container">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <p
          style="
            color: #67645e;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 13px;
          "
        >
          {{ formatDateTime(post.date) }}
        </p>
        <p
          style="
            color: #67645e;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 13px;
          "
        >
          {{ post.location }}
        </p>
        <p
          style="
            color: #67645e;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 13px;
          "
        >
          ${{ post.price }}
        </p>
        <div class="Button-container">
          <button class="Button Button__dark" @click="startCheckout()">
            book a spot
          </button>
        </div>
      </div>
      <div class="post-image">
        <img :src="post.image.asset.url" :alt="post.title" />
      </div>
      <div class="post-content">
        <p>{{ post.description }}</p>
      </div>
      <div class="Button-container">
        <button class="Button Button__dark" @click="startCheckout()">
          book a spot
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { singleEventQuery } from "@/queries/events";

const route = useRoute();
const slug = route.params.slug;

// Fetch the post data from Sanity
const { data: post } = useSanityQuery(singleEventQuery, { slug });

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

async function startCheckout() {
  // Ensure price exists and is a valid number
  const priceInCents = post.value.price
    ? Math.round(parseFloat(post.value.price) * 100)
    : 0;

  // Log to verify the data
  console.log("Event Data:", {
    title: post.value.title,
    price: priceInCents,
    currency: "usd",
    eventId: post.value._id,
  });

  try {
    // Make the request to your server API to initiate Stripe Checkout
    const result = await $fetch("/api/checkout", {
      method: "POST",
      body: {
        title: post.value.title,
        price: priceInCents,
        currency: "usd", // USD currency
        eventId: post.value._id, // Optional: track event
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
</script>
