<template>
  <section>
    <section class="Hero" style="height: 84svh" v-if="shopPage?.heroImage">
      <div class="Hero-background">
        <span class="Image Image--desktop o-placeholder bg-full-height c-image">
          <span class="c-span"></span>
          <img
            class="ls-is-cached lazyloaded c-img"
            :src="shopPage.heroImage.asset.url"
            decoding="async"
            data-nimg="responsive"
            sizes="100vw"
            :alt="shopPage.heading || 'Shop'"
            loading="lazy"
        /></span>
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>{{ shopPage.heading }}</p>
          </h1>
        </div>
      </div>
    </section>

    <div class="Blog-container">
      <div class="Blog-container-filters">
        <p class="u-bold u-pSize u-pSize__Medium u-noMargin">filter by:</p>
        <div class="Blog-container-filters-list">
          <div class="Button-container">
            <button
              type="button"
              @click="selectedFilter = 'all'"
              :class="[
                'Button',
                'filter',
                'filter-btn',
                { active: selectedFilter === 'all' },
              ]"
            >
              <h1 class="margin-0">all</h1>
            </button>
          </div>
          <div
            class="Button-container"
            v-for="type in productTypes"
            :key="type._id"
          >
            <button
              type="button"
              @click="selectedFilter = type.slug"
              :class="[
                'Button',
                'filter',
                'filter-btn',
                { active: selectedFilter === type.slug },
              ]"
            >
              <h1 class="margin-0">{{ type.title }}</h1>
            </button>
          </div>
        </div>
      </div>

      <div class="Blog-container-articles">
        <div v-if="!filteredProducts || filteredProducts.length === 0">
          <h1>No products to see just yet.</h1>
        </div>
        <article
          v-for="product in filteredProducts"
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
import { ref, computed } from "vue";
import {
  allProductsQuery,
  allProductTypesQuery,
  shopPageQuery,
} from "~/queries/shop";

// Fetching data
const { data: products } = useSanityQuery(allProductsQuery);
const { data: productTypes } = useSanityQuery(allProductTypesQuery);
const { data: shopPage } = useSanityQuery(shopPageQuery);

// Filtering logic
const selectedFilter = ref("all");

const filteredProducts = computed(() => {
  if (!products.value) return [];
  if (selectedFilter.value === "all") {
    return products.value;
  }
  return products.value.filter(
    (product) => product.productType?.slug === selectedFilter.value
  );
});
</script>
