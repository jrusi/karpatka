<script setup lang="ts">
import type { GalleryPhoto } from '~/components/PhotoGallery.vue'

const { t } = useI18n()
const { price, pricePerHour } = usePrice()

const highlights = ['kids', 'gear', 'group']
const features = ['instructors', 'basics', 'rental', 'onSite']

// The instructor photo stays first; the rest come from the school photo set.
const portraitPhotos = new Set([5, 6, 7])
const gallery = computed<GalleryPhoto[]>(() => [
  { src: '/instruktor.jpg', thumb: '/szkola/instruktor-thumb.webp', alt: t('school.imageAlt') },
  ...[1, 2, 3, 4, 5, 6, 7].map(n => ({
    src: `/szkola/szkola-${n}.webp`,
    thumb: `/szkola/szkola-${n}-thumb.webp`,
    alt: t(`school.galleryAlt.p${n}`),
    contain: portraitPhotos.has(n),
  })),
])

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: t('school.ld.rentalName'),
        description: t('school.ld.rentalDescription'),
        offers: rentalRows.map(row => ({
          '@type': 'Offer',
          name: t('school.ld.rentalOffer', { item: t(`school.rentalItems.${row.id}`) }),
          price: String(row.day),
          priceCurrency: 'PLN',
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: t('school.ld.lessonName'),
        description: t('school.ld.lessonDescription'),
        offers: lessonRows.map(row => ({
          '@type': 'Offer',
          name: t('school.ld.lessonOffer', { people: t(`school.lessonPeople.${row.people}`) }),
          price: String(row.price),
          priceCurrency: 'PLN',
        })),
      }),
    },
  ],
}))
</script>

<template>
  <section id="szkola" class="py-24 md:py-32 deep-grad relative overflow-hidden">
    <svg class="absolute inset-0 w-full h-full opacity-[.08]" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path class="sketch-line" stroke="white" d="M-50 520 L180 380 L340 460 L520 300 L650 420 L820 260 L980 440 L1150 340 L1300 460 L1460 380"/>
    </svg>
    <div class="relative max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
      <PhotoGallery v-reveal class="reveal order-2 lg:order-1" :photos="gallery" />
      <div v-reveal class="reveal order-1 lg:order-2">
        <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-ice mb-3">{{ t('school.eyebrow') }}</p>
        <h2 class="font-display text-3xl md:text-5xl mb-6 text-white">{{ t('school.titleLine1') }}<br>{{ t('school.titleLine2') }}</h2>
        <p class="text-white/65 leading-relaxed mb-7 max-w-md">{{ t('school.lead') }}</p>

        <div class="grid grid-cols-3 gap-4 mb-8 tabular-nums">
          <div v-for="item in highlights" :key="item" class="border-t border-white/15 pt-3">
            <div class="text-white text-lg">{{ t(`school.highlights.${item}.title`) }}</div>
            <div class="text-white/40 text-[11px] uppercase tracking-wider mt-1">{{ t(`school.highlights.${item}.subtitle`) }}</div>
          </div>
        </div>

        <ul class="space-y-4 mb-9">
          <li v-for="feature in features" :key="feature" class="flex items-start gap-3">
            <span class="mt-1 w-2 h-2 rounded-full bg-red shrink-0"></span>
            <span class="text-white/85 text-sm"><strong class="font-medium text-white">{{ t(`school.features.${feature}.title`) }}</strong> — {{ t(`school.features.${feature}.desc`) }}</span>
          </li>
        </ul>

        <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-ice mb-3">{{ t('pricing.season', { years: seasonYears }) }}</p>
        <div class="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 mb-9">
          <div id="wypozyczalnia" class="rounded-2xl border border-white/15 bg-white/5 overflow-hidden">
            <h3 class="tabular-nums text-[11px] uppercase tracking-wider text-white/40 px-5 pt-5 mb-3">{{ t('school.rentalTitle') }}</h3>
            <div class="grid grid-cols-3 tabular-nums text-[11px] uppercase tracking-wider text-white/40 px-5 pb-2">
              <span></span>
              <span class="text-right">{{ t('school.rentalDay') }}</span>
              <span class="text-right leading-tight">{{ t('school.rentalNight') }}<br><span class="normal-case tracking-normal text-white/30">17:00–21:00</span></span>
            </div>
            <div class="divide-y divide-white/10">
              <div v-for="row in rentalRows" :key="row.id" class="grid grid-cols-3 items-center px-5 py-3 tabular-nums text-sm text-white/85">
                <span>{{ t(`school.rentalItems.${row.id}`) }}</span>
                <span class="text-right text-ice font-medium">{{ price(row.day) }}</span>
                <span class="text-right text-ice font-medium">{{ price(row.night) }}</span>
              </div>
            </div>
            <p class="text-white/35 text-[11px] px-5 py-3 leading-relaxed">{{ t('school.rentalNote') }}</p>
          </div>
          <div class="rounded-2xl border border-white/15 bg-white/5 p-5">
            <p class="tabular-nums text-[11px] uppercase tracking-wider text-white/40 mb-3">{{ t('school.lessonsTitle') }}</p>
            <div class="space-y-2.5 tabular-nums text-sm">
              <div v-for="row in lessonRows" :key="row.people" class="flex justify-between items-baseline text-white/85">
                <span>{{ t(`school.lessonPeople.${row.people}`) }}</span><span class="text-ice font-medium">{{ pricePerHour(row.price) }}</span>
              </div>
            </div>
            <p class="text-white/35 text-[11px] mt-3 leading-relaxed">{{ t('school.lessonExtra', { price: price(lessonExtraPerson) }) }}</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <a :href="contactTelHref" class="bg-red hover:bg-red-deep text-white font-semibold px-7 py-3.5 rounded-full transition-colors">{{ t('school.signUp') }}</a>
          <a :href="contactTelHref" class="border border-white/25 hover:border-white text-white px-7 py-3.5 rounded-full transition-colors tabular-nums text-sm flex items-center">{{ contactTelShort }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
