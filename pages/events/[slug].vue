<template>
  <section class="Post">
    <div class="post-container">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <p class="blog-deet">
          <span v-if="isPastEvent">HAPPENED on</span>
          {{ formatDateTime(post.date) }}
        </p>
        <p class="blog-deet">
          {{ post.location }}
        </p>
        <div class="price-flex">
          <h2 v-if="!isPastEvent">Price: ${{ post.price }}</h2>
          <div class="Button-container" v-if="!isPastEvent">
            <button
              class="Button Button__dark Button__event-post"
              @click="startCheckout()"
            >
              book a spot
            </button>
          </div>
        </div>
      </div>
      <div class="post-image">
        <img :src="post.image.asset.url" :alt="post.title" />
      </div>
      <div class="post-content">
        <p>{{ post.description }}</p>
      </div>
      <div class="price-flex">
        <h2 v-if="!isPastEvent">Price: ${{ post.price }}</h2>
        <div class="Button-container" v-if="!isPastEvent">
          <button
            class="Button Button__dark Button__event-post"
            @click="startCheckout()"
          >
            book a spot
          </button>
        </div>
      </div>
    </div>
  </section>
  <section
    class="EventTestimonials"
    v-if="isPastEvent && post.testimonials?.length"
  >
    <div class="section-header text-center brand">
      <h1 data-splitting="lines" style="font-weight: 400">
        <p>what attendies said</p>
      </h1>
    </div>
    <div class="collection-slider">
      <div class="custom-cursor-wrapper">
        <div class="swiper swiper-pointer-events">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide collection-slide"
              v-for="testimonial in post.testimonials"
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
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { singleEventQuery } from "@/queries/events";

const route = useRoute();
const slug = route.params.slug;

// Fetch the post data from Sanity
const { data: post } = useSanityQuery(singleEventQuery, { slug });

const now = new Date();
const isPastEvent = computed(() => new Date(post.value.date) < now);

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
