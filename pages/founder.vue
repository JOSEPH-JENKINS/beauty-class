<template>
  <div>
    <section class="Hero" style="height: 76svh">
      <div class="Hero-background">
        <span class="Image Image--desktop o-placeholder bg-full-height c-image">
          <span class="c-span"></span>
          <img
            class="ls-is-cached lazyloaded c-img"
            :src="data.image.asset.url"
            decoding="async"
            data-nimg="responsive"
            sizes="100vw"
            alt=""
            loading="lazy"
        /></span>
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>{{ data?.name }}. <i>Founder, Beauty Class</i></p>
          </h1>
        </div>
      </div>
    </section>
    <section class="About">
      <div class="section-header">
        <h1 data-splitting="lines" style="font-weight: 400">
          <p class="text-indent">{{ data.bio }}</p>
        </h1>
      </div>
    </section>
  </div>
</template>

<script setup>
import { founderQuery } from "@/queries/founder";

const { data } = useSanityQuery(founderQuery);
</script>
