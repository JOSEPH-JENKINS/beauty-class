<template>
  <HeroSection v-if="heroSection" :content="heroSection" />
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
                  ? 'Button Button__dark filter-btn active'
                  : 'Button Button__dark filter-btn'
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
                  ? 'Button Button__dark filter-btn active'
                  : 'Button Button__dark filter-btn'
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
                class="Button Button__dark"
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
</script>
