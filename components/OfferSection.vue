<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const gallery = useSlopeGallery()

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
        uploadDate: '2016-12-13T12:00:00+01:00',
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
  { num: '04', key: 'school', route: localePath('/szkola-narciarska'), routeLabel: t('offer.school.link') },
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
          :route-label="item.routeLabel"
        />
      </div>

      <PhotoGallery v-reveal class="reveal mt-14 max-w-5xl mx-auto" :photos="gallery" theme="light" wide />
    </div>
  </section>
</template>
