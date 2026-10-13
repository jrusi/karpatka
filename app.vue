<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const { public: { siteUrl } } = useRuntimeConfig()

// <html lang>, og:locale and hreflang alternate links for every language.
const i18nHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: i18nHead.value.link ?? [],
  meta: i18nHead.value.meta ?? [],
}))

// Defaults for every page; pages (e.g. /kamery) override title/description.
useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogSiteName: () => t('seo.siteName'),
  ogUrl: () => (route.path === '/' ? siteUrl : `${siteUrl}${route.path}`),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogImageAlt: () => t('seo.imageAlt'),
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
