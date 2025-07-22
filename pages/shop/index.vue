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
          class="BlogListItem content-card"
        >
          <div class="card-content">
            <div class="card-image fixed-height">
              <NuxtLink :to="`/shop/${product.slug}`">
                <img
                  :src="product.image?.asset?.url || '/placeholder-image.jpg'"
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
                <p class="Product-price">${{ product.price }}</p>
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

definePageMeta({
  prerender: true,
  isr: 300,
});
</script>
