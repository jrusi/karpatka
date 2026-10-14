<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="bar" class="py-24 md:py-32 bg-powder">
    <div class="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 items-center">
      <div v-reveal class="reveal">
        <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-purple mb-3">{{ t('bar.eyebrow') }}</p>
        <h2 class="font-display text-3xl md:text-5xl mb-6 text-deep-blue">{{ t('bar.title') }}</h2>
        <p class="text-ink-soft leading-relaxed mb-6 max-w-md">{{ t('bar.text') }}</p>
        <a href="#kontakt" class="inline-flex items-center gap-2 tabular-nums text-sm text-purple border-b border-purple/40 hover:border-purple pb-1">{{ t('bar.hoursLink') }}</a>
      </div>
      <div v-reveal class="reveal aspect-[4/3] rounded-3xl overflow-hidden border border-white">
        <img
          src="/bar.jpg"
          :alt="t('bar.imageAlt')"
          class="w-full h-full object-cover"
        >
      </div>
    </div>
  </section>
</template>
