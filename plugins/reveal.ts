export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  function getObserver() {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('in')
          })
        },
        { threshold: 0.15 },
      )
    }
    return observer
  }

  // The "reveal" class itself is written statically in each template (rendered
  // during SSR) so there's no flash of fully-visible content during hydration —
  // this directive only wires up the IntersectionObserver that adds "in".
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      getObserver().observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
