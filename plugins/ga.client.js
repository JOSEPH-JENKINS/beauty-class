export default defineNuxtPlugin((nuxtApp) => {
  // ensure gtag exists even if script hasn't loaded yet
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  // @ts-ignore
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments as any); };

  // fire initial page_view
  const send = () => {
    // @ts-ignore
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title
    });
  };
  send();

  // fire on every nuxt route change
  nuxtApp.hook('page:finish', () => {
    send();
  });
});
