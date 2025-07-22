<template>
  <section class="Product" v-if="product">
    <div class="product-container">
      <div class="product-header">
        <div class="product-header-image">
          <img :src="product.image.asset.url" :alt="product.title" />
        </div>
        <div class="product-header-details">
          <h1>{{ product.title }}</h1>
          <h2>${{ product.price }}</h2>
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

definePageMeta({
  prerender: true,
  isr: 300,
});

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      // The GROQ query for the product must expand image assets in the description
      if (!value?.asset?.url) {
        return null;
      }
      return h("img", {
        src: value.asset.url,
        alt: value.alt || "Product image",
      });
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
    currency: "usd",
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
  height: auto;
  max-height: 450px;
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
