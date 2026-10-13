<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('cameras.pageTitle'),
  description: () => t('cameras.pageDescription'),
  ogTitle: () => t('cameras.pageTitle'),
  ogDescription: () => t('cameras.pageDescription'),
  twitterTitle: () => t('cameras.pageTitle'),
  twitterDescription: () => t('cameras.pageDescription'),
})

const cameras = [
  { id: 'cam1', streamUrl: 'https://stream1.wyciag-karpacz.pl/video.m3u8' },
  { id: 'cam2', streamUrl: 'https://stream1.wyciag-karpacz.pl/2/video.m3u8' },
  { id: 'cam3', streamUrl: 'https://stream2.wyciag-karpacz.pl/3/video.m3u8' },
]
</script>

<template>
  <section class="pt-32 pb-24 md:pt-44 md:pb-32 bg-paper">
    <div class="max-w-7xl mx-auto px-5 md:px-8">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('cameras.eyebrow') }}</p>
      <h1 class="font-display text-3xl md:text-5xl text-deep-blue mb-4 max-w-2xl">{{ t('cameras.pageHeading') }}</h1>
      <p class="text-ink-soft max-w-lg mb-14 leading-relaxed">{{ t('cameras.pageLead') }}</p>

      <div class="grid md:grid-cols-3 gap-6">
        <LiveCameraCard
          v-for="(camera, i) in cameras"
          :key="camera.id"
          :title="t(`cameras.${camera.id}`)"
          :index-label="t('cameras.index', { n: i + 1, total: cameras.length })"
          :stream-url="camera.streamUrl"
        />
      </div>

      <p class="font-mono text-[11px] text-ink-soft/70 mt-8">{{ t('cameras.pageNote') }}</p>

      <div class="mt-10 flex justify-center">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 border border-deep-blue/25 hover:border-accent-blue hover:text-accent-blue text-deep-blue px-7 py-3.5 rounded-full transition-colors font-mono text-sm"
        >
          {{ t('cameras.backHome') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
