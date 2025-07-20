<script setup>
import { siteDefaults } from "@/queries/siteDefaults";
import { useRoute } from "vue-router";
import { popupQuery } from "@/queries/popup";
const { data: settings } = useSanityQuery(siteDefaults);
const { data: popup } = useSanityQuery(popupQuery);
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const MODAL_SEEN_KEY = "lastModalSeen";
const MODAL_COOLDOWN_PERIOD = 12 * 60 * 60 * 1000;
const MODAL_SHOW_DELAY = 2000;

const email = ref("");
const subscribed = ref(false);
const showModal = ref(false);
const isMobileMenuOpen = ref(false);
const isHeaderHidden = ref(false);
const hasScrolled = ref(false);
const lastScrollY = ref(0);

function subscribe() {
  subscribed.value = true;
  email.value = "";
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function handleScroll() {
  const currentScrollY = window.scrollY;
  hasScrolled.value = currentScrollY > 10;

  if (currentScrollY > lastScrollY.value && currentScrollY > 200) {
    isHeaderHidden.value = true;
  } else {
    isHeaderHidden.value = false;
  }

  lastScrollY.value = currentScrollY;
}

const route = useRoute();

const isHome = computed(() => route.path === "/");

onMounted(() => {
  const lastSeen = localStorage.getItem(MODAL_SEEN_KEY);
  const now = Date.now();

  if (!lastSeen || now - parseInt(lastSeen) > MODAL_COOLDOWN_PERIOD) {
    setTimeout(() => {
      showModal.value = true;
      localStorage.setItem(MODAL_SEEN_KEY, now.toString());
    }, MODAL_SHOW_DELAY);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

function closeModal() {
  showModal.value = false;
}

const showAltLogo = computed(() => hasScrolled.value || !isHome.value);
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

    <main id="content">
      <header
        :class="[
          'header',
          {
            transparent: isHome,
            'header--home': isHome,
            'header--scrolled': hasScrolled,
            'header--hidden': isHeaderHidden,
            'header--default': !isHome,
          },
        ]"
      >
        <nav>
          <div class="nav-left-container">
            <NuxtLink to="/about" class="u-showMd">about</NuxtLink>
            <NuxtLink to="/journal" class="u-showMd">journal</NuxtLink>
            <NuxtLink to="/events" class="u-showMd">events</NuxtLink>
          </div>
          <NuxtLink to="/" class="Logo">
            <img
              :src="
                showAltLogo && settings?.logoAlt?.asset?.url
                  ? settings.logoAlt.asset.url
                  : settings?.logo?.asset?.url
              "
              alt="Site Logo"
            />
          </NuxtLink>
          <div class="nav-right-container">
            <NuxtLink to="/shop" class="u-showMd">shop</NuxtLink>
            <NuxtLink to="/work" class="u-showMd">work</NuxtLink>
            <NuxtLink to="/contact" class="u-showMd margin-right-0"
              >contact</NuxtLink
            >

            <div class="Mobile-menu u-hideMd">
              <div
                class="Mobile-menu-toggle"
                tabindex="2"
                aria-label="Toggle mobile navigation"
                @click="toggleMobileMenu"
              >
                <svg
                  width="25"
                  height="18"
                  viewBox="0 0 22 14"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="6"
                    width="22"
                    height="2"
                    rx="1"
                    fill="#84827E"
                  ></rect>
                  <rect
                    y="12"
                    width="22"
                    height="2"
                    rx="1"
                    fill="#84827E"
                  ></rect>
                  <rect width="22" height="2" rx="1" fill="#84827E"></rect>
                </svg>
              </div>
              <div
                class="Mobile-menu-wrapper"
                :class="{ 'is-open': isMobileMenuOpen }"
              >
                <div class="Mobile-menu-container">
                  <div class="Mobile-menu-content-container">
                    <div class="Mobile-menu-content-container-section">
                      <h3 class="Mobile-menu-content-container-section-title">
                        <NuxtLink
                          class="link"
                          to="/about"
                          @click="closeMobileMenu"
                          >ABOUT</NuxtLink
                        >
                      </h3>

                      <h3 class="Mobile-menu-content-container-section-title">
                        <NuxtLink
                          class="link"
                          to="/work"
                          @click="closeMobileMenu"
                          >WORK</NuxtLink
                        >
                      </h3>

                      <h3 class="Mobile-menu-content-container-section-title">
                        <NuxtLink
                          class="link"
                          to="/events"
                          @click="closeMobileMenu"
                          >EVENTS</NuxtLink
                        >
                      </h3>

                      <h3 class="Mobile-menu-content-container-section-title">
                        <NuxtLink
                          class="link"
                          to="/shop"
                          @click="closeMobileMenu"
                          >shop</NuxtLink
                        >
                      </h3>

                      <h3 class="Mobile-menu-content-container-section-title">
                        <NuxtLink
                          class="link"
                          to="/journal"
                          @click="closeMobileMenu"
                          >journal</NuxtLink
                        >
                      </h3>

                      <h3 class="Mobile-menu-content-container-section-title">
                        <NuxtLink
                          class="link"
                          to="/contact"
                          @click="closeMobileMenu"
                          >CONTACT</NuxtLink
                        >
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
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
                      to="/journal"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      journal
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
                    <p>{{ settings?.supportText }}</p>
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

<style>
.header {
  position: absolute;
  /* top: 0; */
  width: 100%;
  border-radius: 8px;
  margin-bottom: -0.5rem;
  left: 0;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  will-change: transform, background-color, box-shadow;
  z-index: 1000;
}

.header--hidden {
  transform: translateY(-200%);
}

.header--scrolled {
  position: fixed !important;
  box-shadow: 0 2px 4px rgba(103, 100, 94, 0.05);
}

/* only apply background on non-homepage or when explicitly wanted */
.header--scrolled:not(.header--home) {
  background-color: #f8f8f8;
}

/* homepage: transparent + sticky */
.header--home {
  position: absolute;
  top: 0;
  width: 100%;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  will-change: transform, background-color, box-shadow;
  z-index: 1000;
}

/* non-homepage: dark background, static above main */
.header--default {
  position: fixed;
  background-color: #f8f8f8;
  z-index: 1000;
}

.header--default nav a,
.header--scrolled nav a {
  color: #67645e;
}

@media (max-width: 768px) {
  .nav-left-container {
    display: none !important;
  }
}
.header--scrolled nav {
  background-color: #f8f8f8;
}
/* Uppercase navigation links */
.nav-left-container .u-showMd,
.nav-right-container .u-showMd,
.nav-right-container .u-hideMd,
.Mobile-menu-content-container-section-title .link,
.FooterMenu-itemLink {
  text-transform: uppercase;
}
</style>
