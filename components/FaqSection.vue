<script setup lang="ts">
const { t } = useI18n()
const { price, pricePerHour } = usePrice()

const hourly = pricingRow('hour1')
const daily = pricingRow('daily')
const evening = pricingRow('evening')
const rental = rentalRows[0]
const lessonSolo = lessonRows.find(row => row.people === 1)!

// Prices are filled in here so they always match the price list.
const answerParams: Record<string, Record<string, string>> = {
  rentalPrice: { day: price(rental.day), night: price(rental.night) },
  passPrice: {
    hourNormal: price(hourly.normal),
    hourReduced: price(hourly.reduced),
    dailyNormal: price(daily.normal),
    dailyReduced: price(daily.reduced),
    eveningNormal: price(evening.normal),
    eveningReduced: price(evening.reduced),
  },
  learnBasics: { lessonSolo: pricePerHour(lessonSolo.price), extra: price(lessonExtraPerson) },
  smallKids: { sled1h: price(pricingRow('sled1h').normal), sled2h: price(pricingRow('sled2h').normal) },
}

const faqKeys = [
  'rentalPrice',
  'passPrice',
  'ownGear',
  'learnBasics',
  'smallKids',
  'sleddingWhere',
  'sledsIncluded',
  'sleddingSnow',
  'sleddingTicket',
  'location',
  'openingHours',
]

const faqs = computed(() => faqKeys.map(key => ({
  q: t(`faq.items.${key}.q`),
  a: t(`faq.items.${key}.a`, answerParams[key] ?? {}),
})))

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.value.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }),
    },
  ],
}))
</script>

<template>
  <section id="faq" class="py-24 md:py-32 bg-paper">
    <div class="max-w-3xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal mb-12">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('faq.eyebrow') }}</p>
        <h2 class="font-display text-3xl md:text-5xl text-deep-blue">{{ t('faq.title') }}</h2>
      </div>

      <div v-reveal class="reveal board rounded-2xl divide-y divide-deep-blue/8 overflow-hidden">
        <details v-for="item in faqs" :key="item.q" class="group px-6 py-5 md:px-8 md:py-6">
          <summary class="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-base md:text-lg text-deep-blue">
            {{ item.q }}
            <span class="shrink-0 font-mono text-accent-blue transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-ink-soft text-sm md:text-base leading-relaxed">{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
