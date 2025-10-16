<template>
  <div
    class="modal-overlay"
    :class="{ 'modal-show': isVisible }"
    @click.self="close"
  >
    <div class="modal-content">
      <button class="modal-close" @click="close">
        <p class="close uppercase">close</p>
      </button>
      <div class="image-container">
        </div>
      <div class="content padded">
        <div class="section-header">
          <h2>{{ heading }}</h2>
        </div>
        <p>{{ subtext }}</p>
        <div class="Footer-newsletter modal border-bottom-0">
          
          <div v-if="subscribed">
            <h3>Thank you for subscribing!</h3>
            <p>This will close automatically.</p>
          </div>

          <form
            v-else
            class="Form Form_multi"
            @submit.prevent="subscribe"
          >
            <input
              class="Input"
              name="email"
              aria-label="Email Address"
              type="email"
              v-model="email"
              placeholder="Email Address"
              required
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

          <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
          <p class="u-pSize Footer-privacy-policy">
            By signing up, you agree to our Privacy Policy*
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ... your defineProps, onMounted, close function etc. are all fine ...
defineProps({
  heading: String,
  subtext: String,
  image: String,
});

import { ref, onMounted } from "vue";
const isVisible = ref(false);
onMounted(() => { isVisible.value = true; });
const emit = defineEmits(["close"]);
function close() { emit("close"); }
// -----------------------------------------------------------------

// MODIFIED SCRIPT LOGIC
const email = ref("");
const subscribed = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

async function subscribe() {
  if (!email.value) return;

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    // Call YOUR Nuxt server endpoint
    await $fetch('/api/subscribe', {
      method: 'POST',
      body: { email: email.value },
    });

    // On success, update the UI
    subscribed.value = true;
    
    // Automatically close the modal after 2.5 seconds
    setTimeout(() => {
      close();
    }, 2500);

  } catch (error) {
    // Handle errors from the endpoint
    console.error(error);
    errorMessage.value = "Subscription failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
/* Your styles remain unchanged */
/* ... */
</style>
