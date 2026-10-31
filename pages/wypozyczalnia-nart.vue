<script setup lang="ts">
const { t } = useI18n()
const { price } = usePrice()
const { public: { siteUrl } } = useRuntimeConfig()

const params = computed(() => ({
  tel: contactTelShort,
  day: price(rentalRows[0].day),
  night: price(rentalRows[0].night),
}))

useSeoMeta({
  title: () => t('rentalPage.title'),
  description: () => t('rentalPage.description', params.value),
  ogTitle: () => t('rentalPage.title'),
  ogDescription: () => t('rentalPage.description', params.value),
  twitterTitle: () => t('rentalPage.title'),
  twitterDescription: () => t('rentalPage.description', params.value),
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: t('rentalPage.ld.serviceType'),
        name: t('school.ld.rentalName'),
        description: t('school.ld.rentalDescription'),
        provider: { '@id': `${siteUrl}/#karpatka` },
        areaServed: { '@type': 'City', name: 'Karpacz' },
        offers: rentalRows.map(row => ({
          '@type': 'Offer',
          name: t('school.ld.rentalOffer', { item: t(`school.rentalItems.${row.id}`) }),
          price: String(row.day),
          priceCurrency: 'PLN',
        })),
      }),
    },
  ],
}))

const gallery = useSlopeGallery({ withVideo: false })
</script>

<template>
  <LandingPage
    ns="rentalPage"
    :params="params"
    :sections="['gear', 'fit', 'evening', 'school']"
    :faq-keys="['price', 'included', 'snowboard', 'where', 'hours']"
    :gallery="gallery"
    :related="[
      { key: 'school', path: '/szkola-narciarska' },
      { key: 'cameras', path: '/kamery' },
      { key: 'slope', path: '/', hash: '#cennik' },
    ]"
  >
    <template #prices>
      <div class="board rounded-2xl overflow-hidden">
        <div class="grid grid-cols-3 tabular-nums text-xs md:text-sm uppercase tracking-wider text-ink-soft px-6 md:px-8 py-4 border-b border-deep-blue/10">
          <span></span>
          <span class="text-right">{{ t('school.rentalDay') }}</span>
          <span class="text-right">{{ t('school.rentalNight') }} <span class="normal-case tracking-normal">17:00–21:00</span></span>
        </div>
        <div class="divide-y divide-deep-blue/8">
          <div v-for="row in rentalRows" :key="row.id" class="grid grid-cols-3 px-6 md:px-8 py-4 tabular-nums text-sm text-ink">
            <span>{{ t(`school.rentalItems.${row.id}`) }}</span>
            <span class="text-right board-digit">{{ price(row.day) }}</span>
            <span class="text-right board-digit">{{ price(row.night) }}</span>
          </div>
        </div>
        <div class="px-6 md:px-8 py-4 tabular-nums text-[11px] text-ink-soft border-t border-deep-blue/10">{{ t('school.rentalNote') }}</div>
      </div>
    </template>
  </LandingPage>
</template>
