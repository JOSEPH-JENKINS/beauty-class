<template>
  <section class="Post">
    <div class="post-container">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <p class="blog-deet">
          {{ post.excerpt }}
        </p>
        <p class="blog-deet">
          {{ formatDateTime(post.publishedAt) }}
        </p>
      </div>
      <div class="post-image">
        <img :src="post.coverImage.asset.url" :alt="post.title" />
      </div>
      <div class="post-content">
        <PortableText :value="post.body" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { blogPostQuery } from "@/queries/blogPost";
import { PortableText } from "@portabletext/vue";

const route = useRoute();
const slug = route.params.slug;

// Fetch the post data from Sanity
const { data: post } = useSanityQuery(blogPostQuery, { slug });

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
</script>
