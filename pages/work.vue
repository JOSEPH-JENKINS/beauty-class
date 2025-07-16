<script setup>
import { allArtistsQuery } from "@/queries/artist";
import { ref } from "vue";
import ArtistModal from "@/components/ArtistModal.vue";

const { data: artists } = useSanityQuery(allArtistsQuery);
const showModal = ref(false);
const currentIndex = ref(0);

function openModal(index) {
  currentIndex.value = index;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <div style="min-height: calc(84svh - (84svh * 1 / 4))">
    <section class="Artists">
      <div
        class="Artist"
        v-for="(artist, i) in artists"
        :key="artist._id"
        @click="openModal(i)"
      >
        <div class="artist-img">
          <img
            :src="artist.image.asset.url"
            :alt="artist.name"
            loading="lazy"
          />
        </div>
        <div class="artist-info">
          <h2>{{ artist.name }}</h2>
          <p>{{ artist.subheading }}</p>
        </div>
      </div>

      <ArtistModal
        v-if="showModal"
        :artist="artists[currentIndex]"
        :index="currentIndex"
        :artists="artists"
        @close="closeModal"
        @update:index="(val) => (currentIndex = val)"
      />
    </section>
  </div>
</template>

<style scoped>
.Artists {
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: repeat(2, 1fr);
  padding: 1.5rem 1rem;
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
  cursor: pointer;
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
  font-size: 1.15em;
  font-weight: 600;
}

.artist-info p {
  font-size: 100%;
  line-height: 1.4;
}
</style>
