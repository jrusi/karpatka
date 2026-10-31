<script setup lang="ts">
const { t } = useI18n()
const { price, pricePerHour } = usePrice()
const { public: { siteUrl } } = useRuntimeConfig()

const lessonPrice = (people: number) => price(lessonRows.find(row => row.people === people)!.price)
const params = computed(() => ({
  tel: contactTelShort,
  solo: lessonPrice(1),
  duo: lessonPrice(2),
  trio: lessonPrice(3),
  quad: lessonPrice(4),
  extra: price(lessonExtraPerson),
  day: price(rentalRows[0].day),
}))

useSeoMeta({
  title: () => t('schoolPage.title'),
  description: () => t('schoolPage.description', params.value),
  ogTitle: () => t('schoolPage.title'),
  ogDescription: () => t('schoolPage.description', params.value),
  twitterTitle: () => t('schoolPage.title'),
  twitterDescription: () => t('schoolPage.description', params.value),
})

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: t('schoolPage.ld.serviceType'),
        name: t('school.ld.lessonName'),
        description: t('school.ld.lessonDescription'),
        provider: { '@id': `${siteUrl}/#karpatka` },
        areaServed: { '@type': 'City', name: 'Karpacz' },
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

const gallery = useSchoolGallery()
</script>

<template>
  <LandingPage
    ns="schoolPage"
    :params="params"
    :sections="['kids', 'preschool', 'slope', 'adults', 'snowboard', 'lessons']"
    :faq-keys="['preschool', 'age', 'price', 'kids', 'gear', 'snowboard', 'where', 'book']"
    :gallery="gallery"
    :related="[
      { key: 'rental', path: '/wypozyczalnia-nart' },
      { key: 'cameras', path: '/kamery' },
      { key: 'slope', path: '/', hash: '#cennik' },
    ]"
  >
    <template #prices>
      <div class="board rounded-2xl overflow-hidden">
        <div class="divide-y divide-deep-blue/8">
          <div v-for="row in lessonRows" :key="row.people" class="grid grid-cols-2 px-6 md:px-8 py-4 tabular-nums text-sm text-ink">
            <span>{{ t(`school.lessonPeople.${row.people}`) }}</span>
            <span class="text-right board-digit">{{ pricePerHour(row.price) }}</span>
          </div>
        </div>
        <div class="px-6 md:px-8 py-4 tabular-nums text-[11px] text-ink-soft border-t border-deep-blue/10">
          {{ t('schoolPage.pricesNote') }} {{ t('school.lessonExtra', { price: price(lessonExtraPerson) }) }}
        </div>
      </div>
    </template>
  </LandingPage>
</template>
