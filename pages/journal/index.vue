<template>
  <div>
    <section
      class="Hero"
      style="height: calc(84svh - (84svh * 1 / 4))"
      v-if="posts && posts.length"
    >
      <div class="Hero-background">
        <video
          autoplay="autoplay"
          playsinline=""
          loop="true"
          muted=""
          :src="blogpage.video.asset.url"
          aria-hidden="true"
          class="heroVideo"
        ></video>

        <div
          class="video-play-pause"
          data-desktop-alignment="right"
          data-mobile-alignment="right"
          @click="videoBtnClick()"
        >
          <button
            type="button"
            class="play"
            :class="{ hidden: isVideoPlaying }"
            aria-label="Play video"
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15.5"
                cy="15.5"
                r="15"
                fill="rgba(0,0,0,0)"
                stroke="#ffffff"
              ></circle>
              <path
                d="M22 16L11.5 22.0622L11.5 9.93782L22 16Z"
                fill="#ffffff"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="pause"
            :class="{ hidden: !isVideoPlaying }"
            aria-label="Pause video"
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15.5"
                cy="15.5"
                r="15"
                fill="rgba(0,0,0,0)"
                stroke="#ffffff"
              ></circle>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 10H11V21H14V10ZM20 10H17V21H20V10Z"
                fill="#ffffff"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="Hero-content BOTTOM-LEFT">
        <div class="Hero-content-wrapper TEXT__LEFT BUTTON__LEFT">
          <h1 data-splitting="lines" style="font-weight: 400" v-if="blogpage">
            <p>
              {{ blogpage.heading }}
            </p>
          </h1>
        </div>
      </div>
    </section>
  </div>
  <section class="blog">
    <div class="Blog-container">
      <div class="Blog-container-filters">
        <p class="u-bold u-pSize u-pSize__Medium u-noMargin">filter by:</p>
        <div class="Blog-container-filters-list">
          <div class="Button-container">
            <button
              type="button"
              :class="[
                'Button',
                'filter',
                'filter-btn',
                { active: selectedCategory === null },
              ]"
              @click="selectedCategory = null"
            >
              <h1 class="margin-0">all</h1>
            </button>
          </div>
          <div
            class="Button-container"
            v-for="cat in categories"
            :key="cat.slug.current"
          >
            <button
              type="button"
              :class="[
                'Button',
                'filter',
                'filter-btn',
                { active: selectedCategory === cat.slug.current },
              ]"
              @click="selectedCategory = cat.slug.current"
              tabindex="0"
            >
              <h1 class="margin-0">{{ cat.title }}</h1>
            </button>
          </div>
        </div>
      </div>
      <div class="Blog-container-articles">
        <div v-if="filteredPosts.length === 0">
          <h1>no posts up just yet</h1>
        </div>
        <article
          v-for="(post, index) in filteredPosts"
          :key="post._id"
          class="BlogListItem content-card"
        >
          <div class="card-content">
            <div class="card-image fixed-height">
              <NuxtLink :to="`/journal/${post.slug.current}`">
                <img
                  :src="
                    `${post.coverImage.asset.url}?auto=format&q=90` ||
                    '/placeholder-image.jpg'
                  "
                  :alt="post.title"
                  loading="lazy"
                  class="card-image"
                />
              </NuxtLink>
            </div>
            <div class="card-info">
              <div class="content-title-wrapper">
                <p class="BlogListItem-content category">
                  {{ post.category.title }}
                </p>
                <h3 class="u-noMargin blog-title">
                  {{ post.title }}
                </h3>
                <p>
                  {{ post.excerpt }}
                </p>
              </div>
            </div>
            <div class="Button-container">
              <NuxtLink class="Button" :to="`/journal/${post.slug.current}`"
                >read more</NuxtLink
              >
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { allPostsQuery, blogPageQuery } from "@/queries/blog";
import { allCategoriesQuery } from "~/queries/category";
const route = useRoute();

const selectedCategory = ref(null);
const heroVideoRef = ref(null);
const isVideoPlaying = ref(true);

// ✅ useAsyncData is required to await Sanity query on both SSR and client
const { data: posts } = await useAsyncData(
  `posts-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(allPostsQuery);
    return data.value; // unwraps the ref before returning
  }
);

definePageMeta({
  prerender: true,
  isr: 300,
});

const { data: blogpage } = await useAsyncData(
  `blogpage-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(blogPageQuery);
    return data.value; // unwraps the ref before returning
  }
);

const { data: categories } = await useAsyncData(
  `categories-${route.fullPath}`,
  async () => {
    const { data } = await useSanityQuery(allCategoriesQuery);
    return data.value; // unwraps the ref before returning
  }
);

useHead(() => {
  const title = blogpage.value?.heading || "Journal";
  const description =
    "Explore our latest journal entries, stories, and updates.";
  const image = blogpage.value?.video?.asset?.url || "/placeholder-image.jpg";

  return {
    title,
    meta: [
      { name: "description", content: description },

      // Open Graph (Facebook, LinkedIn, etc.)
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:type", content: "website" },

      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
  };
});

const filteredPosts = computed(() => {
  if (!selectedCategory.value) return posts.value || [];
  return posts.value.filter(
    (post) => post.category.slug.current === selectedCategory.value
  );
});

const videoBtnClick = () => {
  const video = heroVideoRef.value;
  if (!video) return;

  if (video.paused || video.ended) {
    video.play();
    isVideoPlaying.value = true;
  } else {
    video.pause();
    isVideoPlaying.value = false;
  }
};
</script>
