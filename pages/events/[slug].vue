<template>
  <section class="Post" v-if="post">
    <div class="post-container">
      <div class="post-header">
        <div class="post-header-image">
          <img
            :src="post.image?.asset?.url || '/placeholder-image.jpg'"
            :alt="post.title"
          />
        </div>
        <div class="post-header-details">
          <p v-if="post.eventType" class="post-category">
            {{ post.eventType }}
          </p>
          <h1>{{ post.title }}</h1>
          <p class="post-date">
            <span v-if="isPastEvent">HAPPENED on </span>
            {{ formatDateTime(post.date) }}
          </p>
          <p class="post-location">{{ post.location }}</p>
          <div class="booking-details">
            <h2 v-if="!isPastEvent && post.price > 0">
              Price: ${{ post.price }}
            </h2>
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
      </div>

      <div class="post-content">
        <p>{{ post.description }}</p>
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
                      :src="
                        testimonial.image?.asset?.url ||
                        '/placeholder-image.jpg'
                      "
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
const isPastEvent = computed(
  () => post.value && new Date(post.value.date) < now
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

<style scoped>
.Post {
  padding: 4rem 2rem;
}

.post-container {
  max-width: 1200px;
  margin: 0 auto;
}

.post-header {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

.post-header-image {
  flex: 1;
}

.post-header-image img {
  width: 100%;
  height: auto;
  max-height: 450px;
  display: block;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
}

.post-header-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-category {
  text-transform: uppercase;
  color: #888;
  font-weight: bold;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.post-header-details h1 {
  margin: 0 0 1rem 0;
  font-size: 3rem;
  line-height: 1.2;
}

.post-date,
.post-location {
  color: #555;
  margin-bottom: 0.5rem;
}

.booking-details {
  margin-top: 2rem;
}

.booking-details h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.post-content {
  width: 70%;
  margin: 0 auto;
}

.post-content :deep(img) {
  width: auto;
  height: 100%;
  max-height: 600px;
  object-fit: cover;
  margin: 1rem auto;
  border-radius: 8px;
  display: block;
}

.Button__event-post {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .post-header {
    flex-direction: column;
  }
  .post-content {
    width: 100%;
  }
  .post-header-details h1 {
    font-size: 2rem;
  }
}
</style>
