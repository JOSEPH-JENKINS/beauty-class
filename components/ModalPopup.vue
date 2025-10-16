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
            v-if="!subscribed"
            class="Form Form_multi"
            id="klaviyo"
            novalidate="novalidate"
            @submit.prevent="subscribe"
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

            <div class="Button-container Footer-newsletter-submit-container">
              <button
                class="Button u-pSize Footer-newsletter-submit Button__white Button__large"
                type="submit"
                :disabled="isSubmitting"
              >
                <p class="margin-0 uppercase">
                  {{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}
                </p>
              </button>
            </div>
          </form>
          
          <p v-if="errorMessage" role="alert" style="color: red; margin-top: 10px;">
            {{ errorMessage }}
          </p>

          <p v-if="!subscribed" class="u-pSize Footer-privacy-policy">
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
// Removed unused 'urlFor' and 'useRouter' to clean up
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

// --- MODIFIED SCRIPT LOGIC ---
const email = ref("");
const subscribed = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

// The subscribe function is now async to handle the background request
async function subscribe() {
  if (!email.value) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }
  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    // Call our Nuxt server endpoint
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: email.value },
    });

    // On success, show the thank you message
    subscribed.value = true;
    
    // Automatically close the modal after 2.5 seconds
    setTimeout(() => {
      close();
    }, 2500);

  } catch (error) {
    console.error(error);
    errorMessage.value = "Subscription failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* YOUR ORIGINAL STYLES - COMPLETELY UNCHANGED */
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
/* ... rest of your styles are here and unchanged ... */
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
