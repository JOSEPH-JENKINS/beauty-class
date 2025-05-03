<template>
  <div class="padding-top margin-bottom">
    <main class="Collection">
      <article class="Product-card" v-for="product in data">
        <div class="image-container margin-bottom">
          <img :src="product.image.asset.url" :alt="product.title" />
        </div>
        <div class="Product-info margin-top">
          <h1 class="Product-title u-hSize--Medium">{{ product.title }}</h1>
          <div class="Button-container">
            <NuxtLink
              :to="`/shop/${product.slug.current}`"
              class="Button u-pSize Button__dark Button__large Button__fullWidth js-form-submit"
            >
              view
            </NuxtLink>
          </div>
        </div>
      </article>
    </main>
  </div>
</template>

<script setup>
import { allProductsQuery } from "~/queries/product";

const { data } = useSanityQuery(allProductsQuery);
</script>
