<template>
  <section class="Post" v-if="post">
    <div class="post-container">
      <div class="post-header">
        <div class="post-header-image">
          <img
            :src="`${post.coverImage.asset.url}?auto=format&q=90`"
            :alt="post.title"
          />
        </div>
        <div class="post-header-details text-center">
          <p v-if="post.category" class="category">
            {{ post.category.title }}
          </p>
          <h1>{{ post.title }}</h1>
          <p class="post-date uppercase">By {{ post.writer }}</p>
          <p class="post-date uppercase">
            {{ formatDateTime(post.publishedAt) }}
          </p>
        </div>
      </div>

      <div class="post-content">
        <PortableText :value="post.body" :components="portableTextComponents" />
      </div>
    </div>
  </section>
  <div v-else class="loading-state category uppercase">
    Loading or post not found...
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { blogPostQuery } from "@/queries/blogPost";
import { PortableText } from "@portabletext/vue";
import { h, onMounted } from "vue";

const route = useRoute();
const slug = route.params.slug;

// Fetch the post data from Sanity
const { data: post } = await useAsyncData(`post-${slug}`, async () => {
  const { data } = await useSanityQuery(blogPostQuery, { slug });
  return data.value; // unwraps the ref before returning
});

useHead(() => {
  const title = post.value?.title || "Journal Entry";
  const description = post.value?.excerpt || "Read our latest journal post.";
  const image = post.value?.coverImage?.asset?.url || "/placeholder-image.jpg";
  const publishedTime = post.value?.publishedAt || null;
  const slug = post.value?.slug?.current || "journal";

  return {
    title,
    meta: [
      { name: "description", content: description },

      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content: `https://beauty-class.co.uk/journal/${slug}`,
      },
      publishedTime && {
        property: "article:published_time",
        content: new Date(publishedTime).toISOString(),
      },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ].filter(Boolean), // remove any null values like `publishedTime` if missing
  };
});

definePageMeta({
  isr: 60,
});

function getInstagramCode(url) {
  const match = url.match(/instagram\.com\/(?:p|reel)\/([^/]+)/);
  return match?.[1] || "";
}

function getYouTubeId(url) {
  const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return match?.[1] || "";
}

function getTikTokId(url) {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] || "";
}

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

function formatDateTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toLowerCase();
}

onMounted(() => {
  if (window.twttr) {
    window.twttr.widgets.load();
  }

  if (window.tiktokEmbedLoaded !== true) {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    window.tiktokEmbedLoaded = true;
  }
});
</script>

<style scoped>
.Post {
  padding: 4rem 2rem;
}

.post-container {
  max-width: 1200px;
  margin: 0 auto;
}

.post-header {
  display: flex;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

.post-header-image {
  flex: 1;
}

.post-header-image img {
  width: 100%;
  display: block;
  aspect-ratio: 2 / 3; /* Make it a square */
  border-radius: 8px;
  object-fit: cover;
  object-position: center; /* Center the image if it's cropped */
}

.post-header-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-header-details h1 {
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.post-date {
  color: #555;
}

.post-content {
  width: 70%;
  margin: 0 auto;
  position: relative;
}

.post-content :deep(img) {
  width: 100%; /* Make it responsive */
  aspect-ratio: 1 / 1; /* Make it a square */
  object-fit: cover;
  margin: 1rem auto;
  border-radius: 8px;
  display: block;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .post-header {
    flex-direction: column;
  }
  .post-content {
    width: 100%;
  }
  .post-header-details h1 {
    font-size: 2.5rem;
  }
}
</style>
