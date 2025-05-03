<template>
  <section class="Artists">
    <div class="Artist" v-for="artist in artists" :key="artist._id">
      <div class="artist-img">
        <img :src="artist.image.asset.url" :alt="artist.name" loading="lazy" />
      </div>
      <div class="artist-info">
        <h2>{{ artist.name }}</h2>
        <p>{{ artist.subheading }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { allArtistsQuery } from "@/queries/artist";
const { data: artists } = useSanityQuery(allArtistsQuery);
</script>

<style scoped>
.Artists {
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: repeat(2, 1fr);
  padding: 1.5rem 1rem;
  min-height: 76svh;
}

@media (min-width: 1024px) {
  .Artists {
    grid-template-columns: repeat(5, 1fr);
  }
}

.Artist {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.artist-img {
  width: 100%;
  height: 261.5px;
  border-radius: 12px;
  overflow: hidden;
}

.artist-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.artist-info h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.artist-info p {
  font-size: 0.95rem;
  line-height: 1.4;
}
</style>
