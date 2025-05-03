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
            <p>{{ data?.title }}</p>
          </h1>
        </div>
      </div>
    </section>
    <div class="NoteWithImage margin-bottom">
      <h2 class="u-pSize u-pSize__Medium u-bold">
        <p>A NOTE FROM OUR FOUNDER</p>
      </h2>
      <div class="u-pSize u-pSize__Large">
        <p>
          {{ data.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { aboutQuery } from "@/queries/about";

const { data } = useSanityQuery(aboutQuery);
</script>
