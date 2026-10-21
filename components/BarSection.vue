<script setup lang="ts">
import type { GalleryPhoto } from '~/components/PhotoGallery.vue'

const { t } = useI18n()

// The daytime photo stays first; the rest come from the karczma photo set.
const gallery = computed<GalleryPhoto[]>(() => [
  { src: '/bar.jpg', thumb: '/karczma/bar-thumb.webp', alt: t('bar.imageAltDay') },
  ...[2, 3, 1, 4, 5, 6, 7, 8].map(n => ({
    src: `/karczma/karczma-${n}.webp`,
    thumb: `/karczma/karczma-${n}-thumb.webp`,
    alt: n === 1 ? t('bar.imageAlt') : t(`bar.galleryAlt.p${n}`),
    contain: n === 4,
  })),
])
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
      <PhotoGallery v-reveal class="reveal" :photos="gallery" theme="light" />
    </div>
  </section>
</template>
