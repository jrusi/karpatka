import { defaultLocale, locales } from './i18n/locales'

// Netlify sets this during both build and runtime. Used to switch storage/
// scheduling between the Netlify-native services and plain local dev/self-host.
const isNetlify = !!process.env.NETLIFY

// Absolute origin needed for Open Graph/Twitter tags (og:image and og:url
// must be full URLs, not relative paths).
const siteUrl = 'https://www.wyciag-karpacz.pl'

export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],

  // Polish stays at / (no prefix); other languages get /de/, /en/, /cs/.
  // Texts live in i18n/locales/<code>.json.
  i18n: {
    baseUrl: siteUrl,
    defaultLocale,
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales,
  },

  // Server-only secrets — never exposed to the client bundle. Real values
  // come from environment variables (see .env.example); NUXT_GOOGLE_PLACES_API_KEY
  // and NUXT_GOOGLE_PLACE_ID override these at runtime.
  runtimeConfig: {
    googlePlacesApiKey: '',
    // No hardcoded default — always set via NUXT_GOOGLE_PLACE_ID. Netlify's
    // build-time secrets scanner flags any literal value that matches a
    // configured env var, even non-sensitive ones like a Place ID, if it
    // finds that value checked into the repo or build output.
    googlePlaceId: '',
    // Shared secret required to call POST /api/opening-hours/refresh.
    refreshSecret: '',
    public: {
      siteUrl,
    },
  },

  nitro: {
    preset: isNetlify ? 'netlify' : undefined,
    // Google Places hours are fetched only by the Netlify Scheduled Function
    // netlify/functions/daily-hours-refresh.ts (POST /api/opening-hours/refresh).
    // Persistent KV store — the Nuxt equivalent of the WordPress plugin's
    // get_option()/update_option() cache. Used for local dev/self-host only;
    // on Netlify, server/utils/googleBusinessHours.ts talks to Netlify Blobs
    // directly (Nitro's netlify-blobs driver caches an expiring token).
    storage: {
      data: { driver: 'fs', base: './.data/kv' },
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  app: {
    head: {
      // Title, description and OG/Twitter texts are set per language in app.vue.
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#203A56' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: `${siteUrl}/og-image-v2.jpg` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${siteUrl}/og-image-v2.jpg` },
      ],
      link: [
        // ?v= busts browsers' icon cache; bump it whenever the icon files change.
        { rel: 'icon', href: '/favicon.ico?v=2', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png?v=2', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=2' },
        { rel: 'manifest', href: '/site.webmanifest?v=2' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500&family=Work+Sans:wght@400;500;600;700&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
      noscript: [
        {
          innerHTML: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500&family=Work+Sans:wght@400;500;600;700&display=swap">',
        },
      ],
    },
  },
})
