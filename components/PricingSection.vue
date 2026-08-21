<script setup lang="ts">
const rows = pricingRows
</script>

<template>
  <section id="cennik" class="py-24 md:py-32">
    <div class="max-w-5xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal mb-12">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">Sezon 2025/2026</p>
        <h2 class="font-display text-3xl md:text-5xl text-deep-blue">Cennik karnetów</h2>
      </div>

      <div v-reveal class="reveal board rounded-2xl overflow-hidden">
        <div class="grid grid-cols-3 font-mono text-xs md:text-sm uppercase tracking-wider text-ink-soft px-6 md:px-8 py-4 border-b border-deep-blue/10">
          <span>Karnet</span><span class="text-right">Normalny</span><span class="text-right">Ulgowy</span>
        </div>
        <div class="divide-y divide-deep-blue/8">
          <div v-for="row in rows" :key="row.label" class="grid grid-cols-3 px-6 md:px-8 py-4 font-mono text-sm text-ink">
            <span>{{ row.label }}</span>
            <span class="text-right board-digit">{{ row.normal }}</span>
            <span class="text-right board-digit">{{ row.reduced }}</span>
          </div>
        </div>
        <div class="px-6 md:px-8 py-4 font-mono text-[11px] text-ink-soft border-t border-deep-blue/10">Kaucja zwrotna za kartę: 10 zł (płatna tylko gotówką)</div>
      </div>
    </div>
  </section>
</template>
