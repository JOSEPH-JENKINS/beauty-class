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
          <form
            class="Form Form_multi"
            action="https://beauty-class.us1.list-manage.com/subscribe/post?u=fa6e8aa0d17fd887b05b14006&id=c5186d858b&f_id=0051dbe0f0"
            method="POST"
            target="_blank"
            novalidate="novalidate"
          >
            <input
              class="Input"
              name="EMAIL"
              aria-label="Email Address"
              type="email"
              v-model="email"
              placeholder="Email Address"
              required="true"
            />

            <div style="position: absolute; left: -5000px;" aria-hidden="true">
              <input
                type="text"
                name="b_fa6e8aa0d17fd887b05b14006_c5186d858b"
                tabindex="-1"
                value=""
              >
            </div>

            <div class="Button-container Footer-newsletter-submit-container">
              <button
                class="Button u-pSize Footer-newsletter-submit Button__white Button__large"
                type="submit"
              >
                <p class="margin-0 uppercase">subscribe</p>
              </button>
            </div>
          </form>

          <p class="u-pSize Footer-privacy-policy">
            By signing up, you agree to our Privacy Policy*
          </p>
        </div>
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

const email = ref("");

// REMOVED the 'subscribed' ref and the 'subscribe' function
// as they are no longer needed for the direct Mailchimp submission.
</script>

<style scoped>
/* Your existing styles are perfect and do not need to be changed. */
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
  position: relative;
  width: 70vw;
  border-radius: 8px;
}

.modal-content .Footer-newsletter {
  border-right: 0px;
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
  border-radius: 4px;
  overflow: hidden;
  display: hidden;
}

@media screen and (min-width: 760px) {
  .modal-content {
    grid-template-columns: 1fr 1fr;
    width: 50vw;
    gap: 1rem;
  }
  .image-container {
    display: block;
  }
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
