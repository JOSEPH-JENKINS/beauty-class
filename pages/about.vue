<template>
  <div>
    <section class="Hero" style="height: calc(84svh - (84svh * 1 / 4))">
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
    </section>
    <div class="NoteWithImage margin-bottom">
      <h1 class="u-bold heroFontSize">{{ data?.title }}</h1>
      <div class="note-content">
        <p>
          {{ data?.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { aboutQuery } from "@/queries/about";
const route = useRoute();

const { data } = await useAsyncData(`about-${route.fullPath}`, async () => {
  const { data } = await useSanityQuery(aboutQuery);
  return data.value; // unwraps the ref before returning
});

definePageMeta({
  prerender: true,
  isr: 300,
});

console.log(data.value); // now this is a plain object, not a ref-of-a-ref
</script>

<style scoped>
.NoteWithImage {
  padding: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.NoteWithImage h2 {
  margin-bottom: 2rem;
}

.note-content {
  line-height: 1.6;
  width: 100%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .NoteWithImage {
    padding: 5rem;
  }
  .note-content {
    width: 60%;
  }
}
</style>
