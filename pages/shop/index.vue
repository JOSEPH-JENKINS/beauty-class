<template>
  <section>
    <div
      class="Blog-container"
      style="margin-top: calc(var(--section-spacing) + 1.5rem)"
    >
      <div class="Blog-container-articles">
        <div v-if="!products || products.length === 0">
          <h1>No products to see just yet.</h1>
        </div>
        <article
          v-for="product in products"
          :key="product._id"
          class="BlogListItem content-card shop"
        >
          <div class="card-content">
            <div class="card-image fixed-height">
              <NuxtLink :to="`/shop/${product.slug}`">
                <img
                  :src="
                    `${product.image?.asset?.url}?auto=format&q=90` ||
                    '/placeholder-image.jpg'
                  "
                  :alt="product.title"
                  class="card-image"
                  loading="lazy"
                />
              </NuxtLink>
            </div>
            <div class="card-info">
              <p
                v-if="product.productType"
                class="BlogListItem-content category"
              >
                {{ product.productType.title }}
              </p>
              <div class="content-title-wrapper">
                <h3 class="BlogListItem-title u-noMargin blog-title">
                  {{ product.title }}
                </h3>
                <p class="Product-price">£{{ product.price }}</p>
              </div>
            </div>
            <div class="Button-container" style="margin-top: 1rem">
              <NuxtLink :to="`/shop/${product.slug}`" class="Button filter">
                Shop
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { allProductsQuery, shopPageQuery } from "~/queries/shop";
const route = useRoute();

// Fetching data
const { data: products } = await useAsyncData(
  `products-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(allProductsQuery);
    return data.value; // unwraps the ref before returning
  }
);

const { data: shopPage } = await useAsyncData("shopPage", () =>
  useSanityQuery(shopPageQuery).then((res) => res.data)
);

useHead({
  title: shopPage.value?.title || "Shop",
  meta: [
    {
      name: "description",
      content:
        shopPage.value?.description ||
        "Browse our products and find the perfect fit for your car or lifestyle.",
    },
    {
      property: "og:title",
      content: shopPage.value?.title || "Shop",
    },
    {
      property: "og:description",
      content:
        shopPage.value?.description ||
        "Explore our curated product collection.",
    },
    {
      property: "og:image",
      content: shopPage.value?.ogImage?.asset?.url || "/placeholder-image.jpg",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: shopPage.value?.title || "Shop",
    },
    {
      name: "twitter:description",
      content:
        shopPage.value?.description ||
        "Explore our curated product collection.",
    },
    {
      name: "twitter:image",
      content: shopPage.value?.ogImage?.asset?.url || "/placeholder-image.jpg",
    },
  ],
});

definePageMeta({
  isr: 60,
});
</script>
