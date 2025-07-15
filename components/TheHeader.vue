<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  settings: {
    type: Object,
    default: () => ({}),
  },
  isTransparent: {
    type: Boolean,
    default: false,
  },
});

const isMobileMenuOpen = ref(false);
const hasScrolled = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function handleScroll() {
  if (props.isTransparent) {
    hasScrolled.value = window.scrollY > 10;
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const headerClasses = computed(() => {
  return {
    "header--transparent": props.isTransparent,
    "header--scrolled": hasScrolled.value && props.isTransparent,
  };
});
</script>

<template>
  <header class="Header" :class="headerClasses">
    <nav>
      <div class="nav-left-container">
        <NuxtLink to="/about" class="u-showMd">about</NuxtLink>
        <NuxtLink to="/blog" class="u-showMd">journal</NuxtLink>
        <NuxtLink to="/events" class="u-showMd">events</NuxtLink>

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
              <rect y="6" width="22" height="2" rx="1"></rect>
              <rect y="12" width="22" height="2" rx="1"></rect>
              <rect width="22" height="2" rx="1"></rect>
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
                    <NuxtLink class="link" to="/about" @click="closeMobileMenu"
                      >ABOUT</NuxtLink
                    >
                  </h3>
                  <h3 class="Mobile-menu-content-container-section-title">
                    <NuxtLink class="link" to="/work" @click="closeMobileMenu"
                      >WORK</NuxtLink
                    >
                  </h3>
                  <h3 class="Mobile-menu-content-container-section-title">
                    <NuxtLink class="link" to="/events" @click="closeMobileMenu"
                      >EVENTS</NuxtLink
                    >
                  </h3>
                  <h3 class="Mobile-menu-content-container-section-title">
                    <NuxtLink class="link" to="/shop" @click="closeMobileMenu"
                      >shop</NuxtLink
                    >
                  </h3>
                  <h3 class="Mobile-menu-content-container-section-title">
                    <NuxtLink class="link" to="/blog" @click="closeMobileMenu"
                      >BLOG</NuxtLink
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
</template>

<style scoped>
.Header {
  position: relative; /* Default for non-homepage */
  background-color: #67645e;
  z-index: 1000;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.Header.header--transparent {
  position: absolute; /* For homepage overlay */
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
}

.Header.header--scrolled {
  position: fixed;
  background-color: #f8f8f8; /* Light grey */
  box-shadow: 0 2px 4px rgba(103, 100, 94, 0.05);
}

/* Text color adjustments */
.Header nav a {
  color: white;
}

.Header.header--transparent nav a {
  color: #67645e;
}

.Header.header--scrolled nav a {
  color: #67645e;
}

/* Mobile menu icon color */
.Header .Mobile-menu-toggle svg rect {
  fill: white;
}

.Header.header--transparent .Mobile-menu-toggle svg rect {
  fill: #84827e;
}

.Header.header--scrolled .Mobile-menu-toggle svg rect {
  fill: #67645e;
}

/* Uppercase navigation links from app.vue */
.nav-left-container .u-showMd,
.nav-right-container .u-showMd,
.nav-right-container .u-hideMd,
.Mobile-menu-content-container-section-title .link {
  text-transform: uppercase;
}
</style>
