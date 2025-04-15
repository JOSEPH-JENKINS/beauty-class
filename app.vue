<script setup>
import { siteDefaults } from "@/queries/siteDefaults";
const { data: settings } = useSanityQuery(siteDefaults);
</script>

<template>
  <div class="main-container">
    <header class="header transparent">
      <nav>
        <a tabindex="1" id="skip-to-content" href="#content"
          >Skip to Main Content</a
        >
        <div class="nav-left-container">
          <span v-for="link in settings?.navigation" :key="link.url">
            <NuxtLink
              :to="link.url"
              :target="link.openInNewTab ? '_blank' : '_self'"
              rel="noopener noreferrer"
              class="u-showMd"
            >
              {{ link.label }}
            </NuxtLink>
          </span>
          <NuxtLink to="/" class="u-showMd">About</NuxtLink>
          <NuxtLink to="/" class="u-showMd">About</NuxtLink>
          <NuxtLink to="/" class="u-showMd">About</NuxtLink>

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
                      <NuxtLink class="link" to="/pages/about-us"
                        >ABOUT</NuxtLink
                      >
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/pages/philanthropy"
                        >RHODE FUTURES</NuxtLink
                      >
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/pages/sustainability"
                        >IMPACT</NuxtLink
                      >
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/pages/faq">FAQ</NuxtLink>
                    </h3>

                    <h3 class="Mobile-menu-content-container-section-title">
                      <NuxtLink class="link" to="/account">ACCOUNT</NuxtLink>
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
          <NuxtLink to="/" class="u-showMd">About</NuxtLink>
          <NuxtLink to="/" class="u-showMd">About</NuxtLink>
          <NuxtLink to="/" class="u-showMd">About</NuxtLink>
        </div>
      </nav>
    </header>

    <main id="content">
      <NuxtPage />
    </main>

    <footer class="Footer">
      <div class="Footer-logo">
        <img :src="settings?.logo?.asset?.url" alt="Site Logo" />
      </div>
      <div class="Footer-content-container">
        <div class="Footer-newsletter">
          <p>{{ settings?.footerText }}</p>
        </div>
        <div class="Footer-content">
          <div class="Footer-info">
            <nav>
              <div class="Footer-navigation-list">
                <p class="u-bold">NAVIGATE</p>
                <ul class="Footer-navigation-list">
                  <li>
                    <NuxtLink
                      to="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      About
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      About
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      About
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink
                      to="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="FooterMenu-itemLink u-animate-underline"
                    >
                      About
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
            </nav>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
