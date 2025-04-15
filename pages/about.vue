<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
import { aboutQuery } from "@/queries/about";

const { data } = useSanityQuery(aboutQuery);
</script>
