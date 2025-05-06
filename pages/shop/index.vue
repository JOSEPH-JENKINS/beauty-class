<template>
  <div class="padding-top margin-bottom">
    <main class="Collection">
      <article class="Product-card" v-for="product in data" :key="product._id">
        <div class="image-container">
          <img :src="product.image.asset.url" :alt="product.title" />
        </div>
        <div class="Product-info">
          <h2 class="Product-title">{{ product.title }}</h2>
          <div class="Product-price">
            {{ product.price ? `$${product.price}` : "" }}
          </div>
          <NuxtLink
            :to="`/shop/${product.slug.current}`"
            class="Button filter u-pSize Button__dark Button__large Button__fullWidth js-form-submit"
          >
            View
          </NuxtLink>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
import { allProductsQuery } from "~/queries/product";
const { data } = useSanityQuery(allProductsQuery);
</script>
