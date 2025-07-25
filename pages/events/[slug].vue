<template>
  <section class="Post" v-if="post">
    <div class="post-container">
      <div class="post-header">
        <div class="post-header-image">
          <img
            :src="
              `${post.image?.asset?.url}?auto=format&q=90` ||
              '/placeholder-image.jpg'
            "
            :alt="post.title"
          />
        </div>
        <div class="post-header-details">
          <p v-if="post.eventType" class="category">
            {{ post.eventType }}
          </p>
          <h1>{{ post.title }}</h1>
          <!-- <p class="post-date uppercase" v-if="isPastEvent">
            <span>HAPPENED on {{ formatDateTime(post.date) }}</span>
          </p> -->
          <p class="post-location">{{ post.location }}</p>
          <div class="booking-details">
            <h2 v-if="!isPastEvent && post.price > 0">
              Price: ${{ post.price }}
            </h2>
            <div class="Button-container" v-if="!isPastEvent">
              <button class="Button" @click="startCheckout()">
                book a spot
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="post-content">
        <PortableText
          :value="post.description"
          :components="portableTextComponents"
        />
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
                        `${testimonial.image?.asset?.url}?auto=format&q=90` ||
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
import { PortableText } from "@portabletext/vue";
import { h, onMounted } from "vue";

const route = useRoute();
const slug = route.params.slug;

definePageMeta({
  isr: 60,
});

const { data: post } = await useAsyncData(`event-${slug}`, async () => {
  const { data } = await useSanityQuery(singleEventQuery, { slug });
  return data.value; // unwraps the ref before returning
});

useHead(() => {
  const title = post.value?.title || "Event";
  const description = post.value?.excerpt || "Join us for this exciting event.";
  const image = post.value?.image?.asset?.url || "/placeholder-image.jpg";
  const url = `https://beauty-class.co.uk/events/${slug}`;

  return {
    title,
    meta: [
      { name: "description", content: description },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
});

const now = new Date();
const isPastEvent = computed(
  () => post.value && new Date(post.value.date) < now
);

function getInstagramCode(url) {
  const match = url.match(/instagram\.com\/p\/([^/]+)/);
  return match?.[1] || "";
}

function getYouTubeId(url) {
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return match?.[1] || "";
}

function getTikTokId(url) {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] || "";
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      // The GROQ query for the post must expand image assets.
      // See /queries/blogPost.js for the implementation.
      if (!value?.asset?.url) {
        return null;
      }
      return h("img", {
        src: value.asset.url,
        alt: value.alt || "Embedded blog image",
      });
    },
    socialPost: ({ value }) => {
      const { platform, url, caption } = value;

      const platformName = platform?.toLowerCase();

      const embedMap = {
        instagram: (url) =>
          `<iframe src="https://www.instagram.com/p/${getInstagramCode(
            url
          )}/embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`,
        twitter: (url) =>
          `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote>`,
        youtube: (url) =>
          `<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYouTubeId(
            url
          )}" frameborder="0" allowfullscreen></iframe>`,
        tiktok: (url) =>
          `<blockquote class="tiktok-embed" cite="${url}" data-video-id="${getTikTokId(
            url
          )}"><a href="${url}"></a></blockquote>`,
        linkedin: (url) =>
          `<a href="${url}" target="_blank" rel="noopener">View LinkedIn Post</a>`,
      };

      const embedHtml = embedMap[platformName]?.(url);

      return h("div", {
        class: "social-embed my-6",
        innerHTML: embedHtml || `<a href="${url}" target="_blank">${url}</a>`,
      });
    },
  },
};

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

onMounted(() => {
  if (window.twttr) {
    window.twttr.widgets.load();
  }

  if (window.tiktokEmbedLoaded !== true) {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    window.tiktokEmbedLoaded = true;
  }
});
</script>

<style scoped>
.Post {
  padding: 6rem 2rem 2rem;
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
