<template>
  <section class="Product" v-if="product">
    <div class="product-container">
      <div class="product-header">
        <div class="product-header-image">
          <img
            :src="`${product.image.asset.url}?auto=format&q=90`"
            :alt="product.title"
          />
        </div>
        <div class="product-header-details">
          <h1>{{ product.title }}</h1>
          <h2>£{{ product.price }}</h2>
          <button
            class="Button filter u-pSize Button__dark Button__large js-form-submit"
            style="margin-top: 3rem"
            @click="startCheckout()"
          >
            buy
          </button>
        </div>
      </div>

      <div class="product-content">
        <PortableText
          :value="product.description"
          :components="portableTextComponents"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { singleProductQuery } from "~/queries/product";
import { PortableText } from "@portabletext/vue";
import { h } from "vue";

const route = useRoute();
const slug = route.params.slug;

// Fetch the post data from Sanity
const { data: product } = await useAsyncData(`product-${slug}`, async () => {
  const { data } = await useSanityQuery(singleProductQuery, { slug });
  return data.value; // unwraps the ref before returning
});

useHead(() => {
  const title = product.value?.title ?? "Product";
  const description = `Check out ${title} — available now.`;
  const image = product.value?.image?.asset?.url || "/placeholder-image.jpg";

  return {
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "twitter:card", content: "summary_large_image" },
      { property: "twitter:title", content: title },
      { property: "twitter:description", content: description },
      { property: "twitter:image", content: image },
    ],
  };
});

definePageMeta({
  isr: 60,
});

const portableTextComponents = {
  types: {
    image: ({ value }) => {
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
          getInstagramCode(url)
            ? `<iframe src="https://www.instagram.com/p/${getInstagramCode(
                url
              )}/embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`
            : null,
        twitter: (url) =>
          url
            ? `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote>`
            : null,
        youtube: (url) =>
          getYouTubeId(url)
            ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYouTubeId(
                url
              )}" frameborder="0" allowfullscreen></iframe>`
            : null,
        tiktok: (url) =>
          getTikTokId(url)
            ? `<blockquote class="tiktok-embed" cite="${url}" data-video-id="${getTikTokId(
                url
              )}"><a href="${url}"></a></blockquote>`
            : null,
        linkedin: (url) =>
          url
            ? `<a href="${url}" target="_blank" rel="noopener">View LinkedIn Post</a>`
            : null,
      };

      const embedHtml = embedMap[platformName]?.(url);

      if (!embedHtml) return null;

      return h("div", {
        class: "social-embed my-6",
        innerHTML: embedHtml,
      });
    },
  },
  block: {
    normal: ({ children }) => {
      if (!children) return null;

      const processed = children.map((child) => {
        if (typeof child === "string") {
          const lines = child.split("\n");
          return lines.flatMap((line, i) => [
            line,
            i < lines.length - 1 ? h("br") : null,
          ]);
        }
        return child;
      });

      return h("p", {}, processed);
    },
  },
};

async function startCheckout() {
  // Ensure price exists and is a valid number
  const priceInCents = product.value.price
    ? Math.round(parseFloat(product.value.price) * 100)
    : 0;

  // Log to verify the data
  console.log("Event Data:", {
    title: product.value.title,
    price: priceInCents,
    currency: "gbp",
    eventId: product.value._id,
  });

  try {
    // Make the request to your server API to initiate Stripe Checkout
    const result = await $fetch("/api/checkout", {
      method: "POST",
      body: {
        title: product.value.title,
        price: priceInCents,
        currency: "usd", // USD currency
        eventId: product.value._id, // Optional: track event
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
.Product {
  padding: 4rem 2rem;
}

.product-container {
  max-width: 1200px;
  margin: 0 auto;
}

.product-header {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

.product-header-image {
  flex: 1;
}

.product-header-image img {
  width: 100%;
  aspect-ratio: 2/3;
  display: block;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
}

.product-header-details {
  flex: 1;
}

.product-header-details h1 {
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.product-header-details h2 {
  color: #555;
  margin-bottom: 1rem;
}

.product-content {
  width: 70%;
  margin: 0 auto;
}

.product-content :deep(img) {
  width: auto;
  height: 100%;
  max-height: 600px;
  object-fit: cover;
  margin: 1rem auto;
  border-radius: 8px;
  display: block;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-header {
    flex-direction: column;
  }
  .product-content {
    width: 100%;
  }
  .product-header-details h1 {
    font-size: 2.5rem;
  }
}
</style>
