<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section id="kamery" class="pt-24 pb-6 md:pt-32 md:pb-8 bg-paper">
    <div class="max-w-5xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal text-center mb-12">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('cameras.eyebrow') }}</p>
        <h2 class="font-display text-3xl md:text-5xl text-deep-blue mb-4">{{ t('cameras.sectionTitle') }}</h2>
        <p class="text-ink-soft max-w-lg mx-auto">{{ t('cameras.sectionLead') }}</p>
      </div>

      <div v-reveal class="reveal">
        <div class="rounded-3xl overflow-hidden bg-deep-blue shadow-[0_30px_60px_-30px_rgba(47,79,115,.5)]">
          <LiveCameraFeed
            :index-label="t('cameras.index', { n: 3, total: 3 })"
            stream-url="https://stream2.wyciag-karpacz.pl/3/video.m3u8"
          />
          <div class="flex items-center justify-between px-6 py-4 font-mono text-xs text-white/50">
            <span>{{ t('cameras.view', { title: t('cameras.cam3') }) }}</span>
            <NuxtLink :to="localePath('/kamery')" class="group text-ice hover:text-white flex items-center gap-2 transition-colors">
              {{ t('cameras.seeOthers') }} <span class="transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
