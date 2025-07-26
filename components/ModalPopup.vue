<template>
  <div
    class="modal-overlay"
    :class="{ 'modal-show': isVisible }"
    @click.self="$emit('close')"
  >
    <div class="modal-content">
      <button class="modal-close" @click="close">
        <p class="close uppercase">close</p>
      </button>
      <div class="image-container">
        <img
          v-if="image"
          :src="`${image}?auto=format&q=90`"
          alt="Modal Image"
        />
      </div>
      <div class="content padded">
        <div class="section-header">
          <h2
            data-splitting="lines"
            style="font-weight: 400; margin-top: var(--item-spacing)"
          >
            {{ heading }}
          </h2>
        </div>
        <p>{{ subtext }}</p>
        <div class="Footer-newsletter modal border-bottom-0">
          <p v-if="subscribed">Thank you for subscribing!</p>
          <form
            class="Form Form_multi"
            id="klaviyo"
            action=""
            novalidate="novalidate"
            method="POST"
            @submit.prevent="subscribe"
          >
            <input type="hidden" name="g" value="VyfPYc" />
            <input
              class="Input"
              name="email"
              aria-label="Email Address"
              type="email"
              v-model="email"
              placeholder="Email Address"
              required="true"
              target-element-id="1745050686649"
            />

            <div class="Button-container Footer-newsletter-submit-container">
              <button
                class="Button u-pSize Footer-newsletter-submit Button__white Button__large"
                type="submit"
                data-form-id=""
                data-mode="default"
              >
                <p class="margin-0 uppercase">subscribe</p>
              </button>
            </div>
          </form>
          <p
            role="alert"
            class="u-pSize Footer-newsletter-success"
            style="display: none"
            id="js-newsletter-message"
          ></p>
          <p class="u-pSize Footer-privacy-policy">
            By signing up, you agree to our Privacy Policy*
          </p>
        </div>
        <!-- <div class="Button-container">
          <button class="Button Button__dark" to="/events" @click="handleCTA">
            {{ ctaLabel }}
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  heading: String,
  subtext: String,
  ctaLabel: String,
  image: String,
});

import { ref, onMounted } from "vue";
import { urlFor } from "~/composables/useImageBuilder";
const isVisible = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    isVisible.value = true;
  });
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}

import { useRouter } from "vue-router";

const router = useRouter();

function handleCTA() {
  emit("close"); // First, close the modal
  // Delay navigation slightly to allow modal to close visually
  // setTimeout(() => {
  //   router.push("/events");
  // }, 100);
}

const email = ref("");
const subscribed = ref(false);

function subscribe() {
  subscribed.value = true;
  email.value = "";
  handleCTA();
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  display: grid;
  background: #fff;
  padding: 2.35rem 1rem 1rem;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 1rem;
  position: relative;
  width: 75vw;
  border-radius: 12px;
}

.modal-content .Footer-newsletter {
  border-right: 0px;
}

@media screen and (min-width: 760px) {
  .modal-content {
    grid-template-columns: 1fr 1fr;
  }
}

.modal-close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 100%;
  color: #000;
  line-height: 100%;
  cursor: pointer;
  z-index: 999;
}

.modal-close h1 {
  text-transform: uppercase;
}

.modal-close:hover {
  color: #d683b6;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
}

.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.modal-overlay {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none;
}

.modal-show {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
</style>
