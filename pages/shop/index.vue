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
            :alt="shopPage.heroHeading || 'Shop'"
            loading="lazy"
        /></span>
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>{{ shopPage.heroHeading }}</p>
          </h1>
        </div>
      </div>
    </section>

    <div class="Blog-container">
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

// Fetching data
const { data: products } = useSanityQuery(allProductsQuery);
const { data: shopPage } = useSanityQuery(shopPageQuery);
</script>
