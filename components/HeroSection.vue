<template>
  <div>
    <section class="Hero" style="height: 84svh">
      <div class="Hero-background">
        <!-- <span class="Image Image--desktop o-placeholder bg-full-height c-image">
          <span class="c-span"></span>
          <img
            class="ls-is-cached lazyloaded c-img"
            :src="content.image.asset.url"
            decoding="async"
            data-nimg="responsive"
            sizes="100vw"
            alt=""
            loading="lazy"
        /></span> -->
        <video
          autoplay="autoplay"
          playsinline=""
          loop="true"
          muted=""
          :src="content.video.asset.url"
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
            <p>{{ content?.heading }}</p>
          </h1>
          <div class="Button-container">
            <NuxtLink
              class="Button Button__hero"
              to="/events"
              :aria-label="content.ctaLabel"
              data-mode="default"
            >
              {{ content.ctaLabel }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
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
