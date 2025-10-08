export default defineNuxtPlugin((nuxtApp) => {
  // make sure dataLayer and gtag exist
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments) }

  function sendPageView() {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title
    })
  }

  // initial load
  sendPageView()

  // run on each route change
  nuxtApp.hook('page:finish', () => {
    sendPageView()
  })
})
