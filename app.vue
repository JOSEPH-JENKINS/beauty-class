<script setup>
import { siteDefaults } from "@/queries/siteDefaults";
import { popupQuery } from "@/queries/popup";
const { data: settings } = useSanityQuery(siteDefaults);
const { data: popup } = useSanityQuery(popupQuery);
import { ref } from "vue";

const email = ref("");
const subscribed = ref(false);

function subscribe() {
  subscribed.value = true;
  email.value = "";
}

const showModal = ref(false);

onMounted(() => {
  const toggle = document.querySelector(".js-mobile-menu-toggle");
  const menuWrapper = document.querySelector(".Mobile-menu-wrapper");

  toggle?.addEventListener("click", () => {
    menuWrapper.classList.toggle("is-open");
  });

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .querySelector(".Mobile-menu-wrapper")
        .classList.remove("is-open");
    });
  });

  const lastSeen = localStorage.getItem("lastModalSeen");
  const now = Date.now();

  // Show only if not seen in last 12 hours
  if (!lastSeen || now - parseInt(lastSeen) > 12 * 60 * 60 * 1000) {
    setTimeout(() => {
      showModal.value = true;
      localStorage.setItem("lastModalSeen", now.toString());
    }, 2000); // Delay for animation
  }
});

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <div class="main-container">
    <ModalPopup
      v-if="showModal && popup"
      @close="closeModal"
      :heading="popup.heading"
      :cta-label="popup.ctaLabel"
      :subtext="popup.subtext"
      :image="popup.image.asset.url"
    />
    <header class="header transparent">
      <nav>
        <div class="nav-left-container">
          <NuxtLink to="/about" class="u-showMd">about</NuxtLink>
          <NuxtLink to="/blog" class="u-showMd">journal</NuxtLink>
          <NuxtLink to="/events" class="u-showMd">events</NuxtLink>

          <div class="Mobile-menu u-hideMd">
            <div
              class="Mobile-menu-toggle js-mobile-menu-toggle"
              tabindex="2"
              aria-label="Toggle mobile navigation"
            >
              <svg
                width="25"
                height="18"
                viewBox="0 0 22 14"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="6" width="22" height="2" rx="1" fill="#84827E"></rect>
                <rect y="12" width="22" height="2" rx="1" fill="#84827E"></rect>
                <rect width="22" height="2" rx="1" fill="#84827E"></rect>
              </svg>
            </div>
            <div class="Mobile-menu-wrapper">
              <div class="Mobile-menu-container">
                <div class="Mobile-menu-content-container">
                  <div class="Mobile-menu-content-container-section">
                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/about">ABOUT</NuxtLink>
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/work">WORK</NuxtLink>
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/events">EVENTS</NuxtLink>
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/shop">shop</NuxtLink>
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/blog">BLOG</NuxtLink>
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/contact">CONTACT</NuxtLink>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NuxtLink to="/" class="Logo">
          <img :src="settings?.logo?.asset?.url" alt="Site Logo" />
        </NuxtLink>
        <div class="nav-right-container">
          <NuxtLink to="/shop" class="u-showMd">shop</NuxtLink>
          <NuxtLink to="/work" class="u-showMd">work</NuxtLink>
          <NuxtLink to="/contact" class="u-showMd margin-right-0"
            >contact</NuxtLink
          >
          <NuxtLink to="/contact" class="u-hideMd" style="color: #67645e"
            >contact</NuxtLink
          >
        </div>
      </nav>
    </header>

    <main id="content">
      <NuxtPage />
    </main>

    <footer class="Footer" id="footer">
      <!-- <div class="Footer-logo">
        <img :src="settings?.logo?.asset?.url" alt="Site Logo" />
      </div> -->
      <div class="Footer-content-container">
        <div class="Footer-newsletter">
          <p v-if="!subscribed">{{ settings?.footerText }}</p>
          <p v-if="subscribed">Thank you for subscribing!</p>
          <form
            class="Form Form__single-field"
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
                SUBSCRIBE
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
        <div class="Footer-content">
          <div class="Footer-info">
            <nav>
              <div class="Footer-navigation-list">
                <p class="u-bold">NAVIGATE</p>
                <ul class="Footer-navigation-list">
                  <li>
                    <NuxtLink
                      to="/about"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      About
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/work"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      Work
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/events"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      Events
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/shop"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      Shop
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/blog"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      Blog
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="Footer-navigation-list">
                <p class="u-bold">SOCIAL</p>
                <ul class="Footer-navigation-list">
                  <li v-for="social in settings?.socialLinks" :key="social.url">
                    <NuxtLink
                      :to="social.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      {{ social.platform }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="Footer-navigation-list">
                <p class="u-bold">SUPPORT</p>
                <ul class="Footer-navigation-list">
                  <li>
                    <p>We're here M-F 9am - 5pm PST.</p>
                  </li>
                  <li>
                    <p>Drop us a note anytime.</p>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
