<template>
  <div>
    <section class="Hero" style="height: 76svh">
      <div class="Hero-background">
        <span class="Image Image--desktop o-placeholder bg-full-height c-image">
          <span class="c-span"></span>
          <img
            class="ls-is-cached lazyloaded c-img"
            src="https://www.rhodeskin.com/cdn/shop/files/HP-glam-set-d_000d7892-6ffb-47d8-859f-b38c4365e8f3_480x.jpg?v=1744174715"
            decoding="async"
            data-nimg="responsive"
            sizes="100vw"
            alt=""
            loading="lazy"
        /></span>
      </div>
    </section>
  </div>
</template>

<script setup>
import imageUrlBuilder from "@sanity/image-url";

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>
