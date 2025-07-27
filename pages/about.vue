<template>
  <div>
    <section class="Hero" style="height: calc(84svh - (84svh * 1 / 4))">
      <div class="Hero-background">
        <span class="Image Image--desktop o-placeholder bg-full-height c-image">
          <span class="c-span"></span>
          <img
            class="ls-is-cached lazyloaded c-img"
            :src="`${data.mainImage.asset.url}?q=90&auto=format`"
            decoding="async"
            data-nimg="responsive"
            sizes="100vw"
            alt=""
            loading="lazy"
        /></span>
      </div>
    </section>
    <div class="NoteWithImage margin-top margin-bottom">
      <h1 class="u-bold heroFontSize">{{ data?.title }}</h1>
      <div class="note-content">
        <PortableText
          :value="data?.content"
          :components="portableTextComponents"
        />
      </div>
    </div>
    <section
      class="Hero margin-bottom"
      style="height: calc(84svh - (84svh * 1 / 4))"
      v-if="data?.secondaryImage"
    >
      <div class="Hero-background">
        <span class="Image Image--desktop o-placeholder bg-full-height c-image">
          <span class="c-span"></span>
          <img
            class="ls-is-cached lazyloaded c-img"
            :src="`${data?.secondaryImage?.asset?.url}?q=90&auto=format`"
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
import { aboutQuery } from "@/queries/about";
import { PortableText } from "@portabletext/vue";
import { h, onMounted } from "vue";
const route = useRoute();

const { data } = await useAsyncData(`about-${route.fullPath}`, async () => {
  const { data } = await useSanityQuery(aboutQuery);
  return data.value; // unwraps the ref before returning
});

useHead(() => {
  const title = data?.title || "About Us";
  const description =
    typeof data?.content === "string"
      ? data.content.slice(0, 160)
      : "Learn more about our story.";
  const ogImage = data?.image?.asset?.url || "/placeholder-image.jpg";

  return {
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:image",
        content: ogImage,
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
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image",
        content: ogImage,
      },
    ],
  };
});

definePageMeta({
  isr: 60,
});

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) {
        return null;
      }
      return h("img", {
        src: value.asset.url,
        alt: value.alt || "Embedded blog image",
      });
    },
    socialPost: ({ value }) => {
      const { platform, url, caption } = value;

      const platformName = platform?.toLowerCase();

      const embedMap = {
        instagram: (url) =>
          getInstagramCode(url)
            ? `<iframe src="https://www.instagram.com/p/${getInstagramCode(
                url
              )}/embed" width="400" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`
            : null,
        twitter: (url) =>
          url
            ? `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote>`
            : null,
        youtube: (url) =>
          getYouTubeId(url)
            ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${getYouTubeId(
                url
              )}" frameborder="0" allowfullscreen></iframe>`
            : null,
        tiktok: (url) =>
          getTikTokId(url)
            ? `<blockquote class="tiktok-embed" cite="${url}" data-video-id="${getTikTokId(
                url
              )}"><a href="${url}"></a></blockquote>`
            : null,
        linkedin: (url) =>
          url
            ? `<a href="${url}" target="_blank" rel="noopener">View LinkedIn Post</a>`
            : null,
      };

      const embedHtml = embedMap[platformName]?.(url);

      if (!embedHtml) return null;

      return h("div", {
        class: "social-embed my-6",
        innerHTML: embedHtml,
      });
    },
  },
};
</script>

<style scoped>
.NoteWithImage {
  padding: 0.5rem;
  margin-left: auto;
  margin-right: auto;
}

.NoteWithImage h2 {
  margin-bottom: 2rem;
}

.note-content {
  line-height: 1.6;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.note-content :deep(img) {
  width: 100%; /* Make it responsive */
  aspect-ratio: 1 / 1; /* Make it a square */
  object-fit: cover;
  margin: 1rem auto;
  border-radius: 8px;
  display: block;
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
