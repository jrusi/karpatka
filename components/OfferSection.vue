<script setup lang="ts">
import type { GalleryPhoto } from '~/components/PhotoGallery.vue'

const { t } = useI18n()
const localePath = useLocalePath()

// Photo 6 is a wide two-camera webcam strip, so it is shown whole rather than cropped.
const photo = (n: number): GalleryPhoto => ({
  src: `/stok/stok-${n}.webp`,
  thumb: `/stok/stok-${n}-thumb.webp`,
  alt: t(`offer.galleryAlt.p${n}`),
  contain: n === 6,
})
const gallery = computed<GalleryPhoto[]>(() => [
  ...[8, 4, 5, 1, 2, 3, 7, 6].map(photo),
  {
    src: '/stok/karpatka-film-poster.webp',
    thumb: '/stok/karpatka-film-thumb.webp',
    alt: t('offer.galleryAlt.video'),
    video: '/stok/karpatka-film.mp4',
  },
])

const { public: { siteUrl } } = useRuntimeConfig()

// Lets search engines list the promo video. The video's on-screen text is Polish in every locale.
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: t('offer.ld.videoName'),
        description: t('offer.ld.videoDescription'),
        thumbnailUrl: `${siteUrl}/stok/karpatka-film-poster.webp`,
        contentUrl: `${siteUrl}/stok/karpatka-film.mp4`,
        uploadDate: '2016-12-13',
        duration: 'PT1M39S',
        inLanguage: 'pl',
        publisher: { '@type': 'Organization', name: 'Karpatka', url: siteUrl },
      }),
    },
  ],
}))

const items = computed(() => [
  { num: '01', key: 'lifts' },
  { num: '02', key: 'beltLift' },
  { num: '03', key: 'sledding' },
  { num: '04', key: 'school', link: { href: '#szkola', label: t('offer.school.link') } },
  { num: '05', key: 'parking' },
  { num: '06', key: 'cameras', route: localePath('/kamery') },
].map(item => ({ ...item, title: t(`offer.${item.key}.title`), desc: t(`offer.${item.key}.desc`) })))
</script>

<template>
  <section id="oferta" class="py-24 md:py-32 bg-paper relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 md:px-8 relative">
      <p v-reveal class="reveal tabular-nums text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('offer.eyebrow') }}</p>
      <h2 v-reveal class="reveal font-display text-deep-blue text-3xl md:text-5xl mb-14 max-w-2xl">{{ t('offer.title') }}</h2>

      <div v-reveal class="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-deep-blue/10 rounded-2xl overflow-hidden">
        <OfferCard
          v-for="item in items"
          :key="item.num"
          :num="item.num"
          :title="item.title"
          :desc="item.desc"
          :link="item.link"
          :route="item.route"
        />
      </div>

      <PhotoGallery v-reveal class="reveal mt-14 max-w-5xl mx-auto" :photos="gallery" theme="light" wide />
    </div>
  </section>
</template>
