// Netlify sets this during both build and runtime. Used to switch storage/
// scheduling between the Netlify-native services and plain local dev/self-host.
const isNetlify = !!process.env.NETLIFY

export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

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
  },

  nitro: {
    preset: isNetlify ? 'netlify' : undefined,
    experimental: {
      tasks: true,
    },
    // Nitro's timer-based scheduler needs a long-running process, so it only
    // works for self-hosted/node-server deploys. On Netlify (serverless
    // functions, no persistent process) the daily fetch is instead triggered
    // by netlify/functions/daily-hours-refresh.mts, a native Netlify
    // Scheduled Function that calls POST /api/opening-hours/refresh.
    scheduledTasks: isNetlify
      ? undefined
      : {
          // 00:05 daily — a few minutes past midnight, same cadence as the
          // WordPress plugin's daily cron, offset slightly off the exact hour.
          '5 0 * * *': ['fetch-opening-hours'],
        },
    // Persistent KV store — the Nuxt equivalent of the WordPress plugin's
    // get_option()/update_option() cache. Local disk in dev/self-host isn't
    // durable on Netlify's ephemeral functions, so Netlify Blobs is used
    // there instead (credentials are injected automatically by Netlify).
    storage: {
      data: isNetlify
        ? { driver: 'netlify-blobs', name: 'karpatka-data' }
        : { driver: 'fs', base: './.data/kv' },
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  app: {
    head: {
      title: 'Karpatka — Wyciągi Narciarskie Karpacz',
      htmlAttrs: { lang: 'pl' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'description',
          content: 'Wyciągi narciarskie w Karpaczu — dwa wyciągi orczykowe, taśma dla najmłodszych i górka saneczkowa, tuż pod Śnieżką. Nauka jazdy na nartach, cennik, aktualne warunki na stoku i bezpłatny parking.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
      noscript: [
        {
          innerHTML: '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">',
        },
      ],
    },
  },
})
