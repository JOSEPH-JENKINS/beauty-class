<template>
  <section class="Post" v-if="post">
    <div class="post-container">
      <div class="post-header">
        <div class="post-header-image">
          <img :src="post.coverImage.asset.url" :alt="post.title" />
        </div>
        <div class="post-header-details text-center">
          <p v-if="post.category" class="post-category">
            {{ post.category.title }}
          </p>
          <h1>{{ post.title }}</h1>
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
</template>

<script setup>
import { useRoute } from "vue-router";
import { blogPostQuery } from "@/queries/blogPost";
import { PortableText } from "@portabletext/vue";
import { h } from "vue";

const route = useRoute();
const slug = route.params.slug;

// Fetch the post data from Sanity
const { data: post } = useSanityQuery(blogPostQuery, { slug });

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      // The GROQ query for the post must expand image assets.
      // See /queries/blogPost.js for the implementation.
      if (!value?.asset?.url) {
        return null;
      }
      return h("img", {
        src: value.asset.url,
        alt: value.alt || "Embedded blog image",
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
  height: auto;
  max-height: 450px; /* Limit the height of the main image */
  display: block;
  border-radius: 8px;
  object-fit: cover;
  object-position: center; /* Center the image if it's cropped */
}

.post-header-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-category {
  text-transform: uppercase;
  color: #888;
  font-weight: bold;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.post-header-details h1 {
  margin: 0 0 1rem 0;
  font-size: 3rem;
  line-height: 1.2;
}

.post-date {
  color: #555;
}

.post-content {
  width: 70%;
  margin: 0 auto;
}

.post-content :deep(img) {
  width: auto;
  height: 100%;
  max-height: 600px;
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
