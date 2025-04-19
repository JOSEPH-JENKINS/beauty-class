<template>
  <section class="Post">
    <div class="post-container">
      <div class="post-title">
        <h1>{{ post.title }}</h1>
        <p
          style="
            color: #67645e;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 13px;
          "
        >
          {{ post.excerpt }}
        </p>
        <p
          style="
            color: #67645e;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 13px;
          "
        >
          {{ formatDateTime(post.publishedAt) }}
        </p>
      </div>
      <div class="post-image">
        <img :src="post.coverImage.asset.url" :alt="post.title" />
      </div>
      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { blogPostQuery } from "@/queries/blogPost";

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
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
</script>
