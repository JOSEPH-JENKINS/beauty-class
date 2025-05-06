<template>
  <div>
    <section class="Hero" style="height: 76svh">
      <div class="Hero-background">
        <video
          autoplay="autoplay"
          playsinline=""
          loop="true"
          muted=""
          :src="heroSection.video.asset.url"
          aria-hidden="true"
          class="heroVideo"
        ></video>
        <div
          class="video-play-pause js-video-toggle"
          data-desktop-alignment="right"
          data-mobile-alignment="right"
          @click="videoBtnClick()"
        >
          <button type="button" class="play hidden" aria-label="Play video">
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
          <button type="button" class="pause" aria-label="Pause video">
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
          <h1 data-splitting="lines" style="font-weight: 400">
            <p>we write, you read</p>
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
              @click="selectedCategory = null"
              :class="
                selectedCategory === null
                  ? 'Button filter Button__dark filter-btn active'
                  : 'Button filter Button__dark filter-btn'
              "
            >
              <h1 class="margin-0">all</h1>
            </button>
          </div>
          <div
            class="Button-container"
            v-for="cat in categories"
            :key="cat.slug.current"
            @click="selectedCategory = cat.slug.current"
          >
            <button
              type="button"
              :class="
                selectedCategory === cat.slug.current
                  ? 'Button filter Button__dark filter-btn active'
                  : 'Button filter Button__dark filter-btn'
              "
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
          class="BlogListItem"
        >
          <div class="Image-container">
            <div class="Custom-wrapper">
              <div class="image">
                <span
                  class="Image Image--desktop o-placeholder bg-full-height"
                  style="
                    box-sizing: border-box;
                    display: block;
                    overflow: hidden;
                    background: none;
                    opacity: 1;
                    border: 0px;
                    margin: 0px;
                    padding: 0px;
                    transform: translate3d(0px, 0px, 0px) scale(1.031, 1.03099);
                  "
                >
                  <span
                    style="
                      box-sizing: border-box;
                      display: block;
                      width: initial;
                      height: initial;
                      background: none;
                      opacity: 1;
                      border: 0px;
                      margin: 0px;

                      padding-bottom: 56.25%;
                    "
                  ></span>
                  <img
                    class="ls-is-cached lazyloaded"
                    :src="post.coverImage.asset.url"
                    decoding="async"
                    data-nimg="responsive"
                    sizes="100vw"
                    :alt="post.title"
                    loading="lazy"
                    style="
                      position: absolute;
                      inset: 0px;
                      box-sizing: border-box;
                      padding: 0px;
                      border: none;
                      margin: auto;
                      display: block;
                      width: 0px;
                      height: 0px;
                      min-width: 100%;
                      max-width: 100%;
                      min-height: 100%;
                      max-height: 100%;
                      object-fit: cover;
                      object-position: top center;
                    "
                /></span>
              </div>
            </div>
          </div>
          <div class="BlogListItem-link">
            <div class="BlogListItem-link margin-bottom">
              <h2 class="BlogListItem-content category u-pSize u-pSize__Small">
                {{ post.category.title }}
              </h2>
              <h1 class="BlogListItem-title u-bold u-pSize u-pSize__Medium">
                {{ post.title }}
              </h1>
              <p class="BlogListItem-content u-pSize u-pSize__Small">
                {{ post.excerpt }}
              </p>
            </div>
            <div class="Button-container">
              <NuxtLink
                class="Button filter Button__dark"
                :to="`/blog/${post.slug.current}`"
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
import { allPostsQuery } from "@/queries/blog";
import { allCategoriesQuery } from "~/queries/category";
import { homepageQuery } from "@/queries/homepage";

const selectedCategory = ref(null);

const { data: posts } = useSanityQuery(allPostsQuery);
const { data: homepage } = useSanityQuery(homepageQuery);
const { data: categories } = useSanityQuery(allCategoriesQuery);

const filteredPosts = computed(() => {
  if (!selectedCategory.value) return posts.value;
  return posts.value.filter(
    (post) => post.category.slug.current === selectedCategory.value
  );
});

const heroSection = computed(() => {
  return homepage.value?.pageBuilder?.find(
    (section) => section._type === "heroSection"
  );
});

const videoBtnClick = () => {
  const video = document.querySelector(".heroVideo");
  const toggleBtn = document.querySelector(".js-video-toggle");
  const playEl = toggleBtn.querySelector(".play");
  const pauseEl = toggleBtn.querySelector(".pause");

  console.log("click");
  if (video.paused) {
    video.play();
    playEl.classList.add("hidden");
    pauseEl.classList.remove("hidden");
  } else {
    video.pause();
    pauseEl.classList.add("hidden");
    playEl.classList.remove("hidden");
  }
};
</script>
