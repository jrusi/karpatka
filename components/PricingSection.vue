<script setup lang="ts">
const { t } = useI18n()
const { price } = usePrice()

const rows = pricingRows
const liftRows = pricingRows.filter(row => !row.sled)
const sledRows = pricingRows.filter(row => row.sled)

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: t('pricing.ld.liftName'),
        description: t('pricing.ld.liftDescription'),
        offers: liftRows.map(row => ({
          '@type': 'Offer',
          name: t('pricing.ld.offer', { label: t(`pricing.rows.${row.id}`) }),
          price: String(row.normal),
          priceCurrency: 'PLN',
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: t('pricing.ld.sledName'),
        description: t('pricing.ld.sledDescription'),
        offers: sledRows.map(row => ({
          '@type': 'Offer',
          name: t('pricing.ld.offer', { label: t(`pricing.rows.${row.id}`) }),
          price: String(row.normal),
          priceCurrency: 'PLN',
        })),
      }),
    },
  ],
}))
</script>

<template>
  <section id="cennik" class="py-24 md:py-32">
    <div class="max-w-5xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal mb-12">
        <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('pricing.season', { years: seasonYears }) }}</p>
        <h2 class="font-display text-3xl md:text-5xl text-deep-blue">{{ t('pricing.title') }}</h2>
      </div>

      <div v-reveal class="reveal board rounded-2xl overflow-hidden">
        <div class="grid grid-cols-3 tabular-nums text-xs md:text-sm uppercase tracking-wider text-ink-soft px-6 md:px-8 py-4 border-b border-deep-blue/10">
          <span>{{ t('pricing.colPass') }}</span><span class="text-right">{{ t('pricing.colNormal') }}</span><span class="text-right">{{ t('pricing.colReduced') }}</span>
        </div>
        <div class="divide-y divide-deep-blue/8">
          <div v-for="row in rows" :key="row.id" class="grid grid-cols-3 px-6 md:px-8 py-4 tabular-nums text-sm text-ink">
            <span>{{ t(`pricing.rows.${row.id}`) }}</span>
            <span class="text-right board-digit">{{ price(row.normal) }}</span>
            <span class="text-right board-digit">{{ price(row.reduced) }}</span>
          </div>
        </div>
        <div class="px-6 md:px-8 py-4 tabular-nums text-[11px] text-ink-soft border-t border-deep-blue/10">{{ t('pricing.deposit', { price: price(cardDeposit) }) }}</div>
      </div>
    </div>
  </section>
</template>
