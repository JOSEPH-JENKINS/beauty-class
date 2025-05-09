<template>
  <section class="product">
    <div class="product-img">
      <img :src="product.image.asset.url" :alt="product.title" />
    </div>
    <div class="product-info">
      <h1 style="font-size: 1rem">{{ product.title }}</h1>
      <h2>${{ product.price }}</h2>
      <PortableText :value="product.description" />
      <button
        class="Button filter u-pSize Button__dark Button__large Button__fullWidth js-form-submit"
        style="margin-top: 3rem"
        @click="startCheckout()"
      >
        buy
      </button>
    </div>
  </section>
</template>

<script setup>
import { singleProductQuery } from "~/queries/product";
import { PortableText } from "@portabletext/vue";

const route = useRoute();
const slug = route.params.slug;

// Fetch the post data from Sanity
const { data: product } = useSanityQuery(singleProductQuery, { slug });

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
