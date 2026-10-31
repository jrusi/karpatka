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

// The business itself, on every page — lets search engines tie the site to the
// Google Maps listing (address, coordinates, phone). Other pages' structured
// data refer to it by @id.
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SkiResort',
        '@id': `${siteUrl}/#karpatka`,
        name: t('seo.siteName'),
        alternateName: 'Stok Karpatka',
        description: t('seo.description'),
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/og-image-v2.jpg`,
        telephone: contactTel.replace(/\s+/g, ''),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ul. Myśliwska 3',
          postalCode: '58-540',
          addressLocality: 'Karpacz',
          addressRegion: 'dolnośląskie',
          addressCountry: 'PL',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 50.7817842, longitude: 15.7502718 },
        hasMap: 'https://maps.google.com/?cid=6301565874125859223',
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: t('seo.amenities.parking'), value: true },
          { '@type': 'LocationFeatureSpecification', name: t('seo.amenities.school'), value: true },
          { '@type': 'LocationFeatureSpecification', name: t('seo.amenities.rental'), value: true },
          { '@type': 'LocationFeatureSpecification', name: t('seo.amenities.sledding'), value: true },
        ],
      }),
    },
  ],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
