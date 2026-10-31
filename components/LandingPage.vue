<script setup lang="ts">
import type { GalleryPhoto } from '~/components/PhotoGallery.vue'

// Shared layout of the topic pages (ski school, rental). Texts live under
// <ns>.* in i18n/locales/<code>.json; `params` fills prices and the phone number.
const props = defineProps<{
  ns: string
  params: Record<string, string>
  sections: string[]
  faqKeys: string[]
  gallery: GalleryPhoto[]
  related: { key: string; path: string; hash?: string }[]
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const tp = (key: string) => t(`${props.ns}.${key}`, props.params)

const faqs = computed(() => props.faqKeys.map(key => ({
  q: tp(`faq.${key}.q`),
  a: tp(`faq.${key}.a`),
})))
</script>

<template>
  <section class="pt-32 pb-24 md:pt-44 md:pb-32 bg-paper">
    <div class="max-w-7xl mx-auto px-5 md:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ tp('eyebrow') }}</p>
          <h1 class="font-display text-4xl md:text-6xl leading-[1.05] text-deep-blue mb-4">{{ tp('h1') }}</h1>
          <p class="font-display text-xl md:text-2xl text-deep-blue/75 mb-6">{{ tp('subtitle') }}</p>
          <p class="text-ink-soft leading-relaxed mb-9 max-w-xl">{{ tp('lead') }}</p>
          <div class="flex flex-wrap gap-4">
            <a :href="contactTelHref" class="bg-red hover:bg-red-deep text-white font-semibold px-7 py-3.5 rounded-full transition-colors">{{ tp('call') }}</a>
            <a href="#ceny" class="border border-deep-blue/25 hover:border-accent-blue hover:text-accent-blue text-deep-blue px-7 py-3.5 rounded-full transition-colors tabular-nums text-sm flex items-center">{{ tp('seePrices') }}</a>
          </div>
        </div>
        <PhotoGallery :photos="gallery" theme="light" />
      </div>

      <div class="mt-20 border-t border-deep-blue/10 pt-14 grid md:grid-cols-2 gap-x-14 gap-y-12">
        <div v-for="section in sections" :key="section" v-reveal class="reveal">
          <h2 class="font-display text-2xl md:text-3xl text-deep-blue mb-4">{{ tp(`sections.${section}.title`) }}</h2>
          <p class="text-ink-soft leading-relaxed">{{ tp(`sections.${section}.text`) }}</p>
        </div>
      </div>

      <div id="ceny" v-reveal class="reveal mt-20 max-w-3xl mx-auto scroll-mt-28">
        <p class="tabular-nums text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">{{ t('pricing.season', { years: seasonYears }) }}</p>
        <h2 class="font-display text-3xl md:text-4xl text-deep-blue mb-8">{{ tp('pricesTitle') }}</h2>
        <slot name="prices" />
      </div>

      <div class="mt-20 max-w-3xl mx-auto">
        <h2 v-reveal class="reveal font-display text-3xl md:text-4xl text-deep-blue mb-8">{{ tp('faqTitle') }}</h2>
        <FaqList v-reveal class="reveal" :items="faqs" />
      </div>

      <nav :aria-label="t('landing.related')" class="mt-20 grid md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="link in related"
          :key="link.key"
          :to="{ path: localePath(link.path), hash: link.hash }"
          class="group rounded-2xl bg-white/60 border border-deep-blue/10 hover:border-accent-blue p-6 text-deep-blue transition-colors flex items-center justify-between gap-4"
        >
          <span class="font-display text-lg">{{ t(`landing.links.${link.key}`) }}</span>
          <span class="text-accent-blue transition-transform group-hover:translate-x-1">→</span>
        </NuxtLink>
      </nav>
    </div>
  </section>
</template>
