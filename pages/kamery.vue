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

const seoTopics = [
  { key: 'slope', hash: '#oferta' },
  { key: 'school', hash: '#szkola' },
  { key: 'sledding', hash: '#cennik' },
]
</script>

<template>
  <section class="pt-32 pb-24 md:pt-44 md:pb-32 bg-paper">
    <div class="max-w-7xl mx-auto px-5 md:px-8">
      <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('cameras.eyebrow') }}</p>
      <h1 class="font-display text-3xl md:text-5xl text-deep-blue mb-3 max-w-3xl">{{ t('cameras.pageH1') }}</h1>
      <p class="font-display text-xl md:text-2xl text-deep-blue/75 mb-4 max-w-2xl">{{ t('cameras.pageHeading') }}</p>
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

      <p class="tabular-nums text-[11px] text-ink-soft/70 mt-8">{{ t('cameras.pageNote') }}</p>

      <!-- Descriptive copy for search (live cameras, ski school, sledding) with links into the home page. -->
      <div class="mt-20 border-t border-deep-blue/10 pt-14">
        <div class="max-w-3xl">
          <h2 class="font-display text-2xl md:text-4xl text-deep-blue mb-5">{{ t('cameras.seo.title') }}</h2>
          <p class="text-ink-soft leading-relaxed mb-8">{{ t('cameras.seo.intro') }}</p>
          <h3 class="text-deep-blue font-semibold text-lg mb-2">{{ t('cameras.seo.viewsTitle') }}</h3>
          <p class="text-ink-soft leading-relaxed">{{ t('cameras.seo.viewsText') }}</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mt-12">
          <div v-for="topic in seoTopics" :key="topic.key" class="rounded-2xl bg-white/60 border border-deep-blue/10 p-6 flex flex-col">
            <h3 class="text-deep-blue font-semibold text-lg mb-2">{{ t(`cameras.seo.${topic.key}.title`) }}</h3>
            <p class="text-ink-soft text-sm leading-relaxed mb-5">{{ t(`cameras.seo.${topic.key}.text`) }}</p>
            <NuxtLink :to="{ path: localePath('/'), hash: topic.hash }" class="mt-auto self-start tabular-nums text-sm text-accent-blue border-b border-accent-blue/40 hover:border-accent-blue pb-0.5">
              {{ t(`cameras.seo.${topic.key}.link`) }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="mt-10 flex justify-center">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-2 border border-deep-blue/25 hover:border-accent-blue hover:text-accent-blue text-deep-blue px-7 py-3.5 rounded-full transition-colors tabular-nums text-sm"
        >
          {{ t('cameras.backHome') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
