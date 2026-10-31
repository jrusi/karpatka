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
</script>

<template>
  <section id="faq" class="py-24 md:py-32 bg-paper">
    <div class="max-w-3xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal mb-12">
        <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('faq.eyebrow') }}</p>
        <h2 class="font-display text-3xl md:text-5xl text-deep-blue">{{ t('faq.title') }}</h2>
      </div>

      <FaqList v-reveal class="reveal" :items="faqs" />
    </div>
  </section>
</template>
