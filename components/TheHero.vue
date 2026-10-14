<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { data: temperatureData, refresh: refreshTemperature } = await useFetch('/api/temperature')
const { todayLabel: hoursLabel } = await useOpeningHours()

const temperatureLabel = computed(() => {
  const value = temperatureData.value?.temperature
  if (value === null || value === undefined) return '—°'
  return `${Math.round(value)}°`
})

let temperatureInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  temperatureInterval = setInterval(() => refreshTemperature(), 60_000)
})

onUnmounted(() => {
  if (temperatureInterval) clearInterval(temperatureInterval)
})
</script>

<template>
  <section id="top" class="relative overflow-hidden pt-[4.5rem] pb-20 md:pt-44 md:pb-28">
    <div class="absolute inset-0">
      <img src="/hero-bg.jpg" alt="" class="w-full h-full object-cover" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/35"></div>
      <div class="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-b from-transparent to-paper"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-5 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-10 gap-y-5 md:items-center">
        <p class="md:col-start-1 md:row-start-1 text-center tabular-nums text-[13px] uppercase tracking-[0.2em] text-accent-blue">{{ t('hero.eyebrow') }}</p>
        <img
          src="/logo.png"
          :alt="t('common.logoAlt')"
          class="md:col-start-2 md:row-start-1 md:row-span-2 h-28 md:h-36 lg:h-44 w-auto shrink-0 justify-self-center md:justify-self-end"
        >
        <h1 class="md:col-start-1 md:row-start-2 min-w-0 font-display text-deep-blue text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
          {{ t('hero.titleMain') }}<br class="hidden md:block"> <span class="italic font-medium text-accent-blue"> {{ t('hero.titleAccent') }}</span>
        </h1>
      </div>
      <p class="mt-6 text-ink-soft max-w-xl text-base md:text-lg leading-relaxed">
        {{ t('hero.lead') }}
      </p>
      <div class="mt-9 flex flex-wrap gap-4">
        <a href="#cennik" class="bg-red hover:bg-red-deep text-white font-semibold px-7 py-3.5 rounded-full transition-colors">{{ t('hero.seePricing') }}</a>
        <a :href="contactTelHref" class="bg-white/90 backdrop-blur-sm border border-deep-blue/25 hover:border-accent-blue text-deep-blue px-7 py-3.5 rounded-full transition-colors tabular-nums text-sm flex items-center shadow-sm">{{ t('hero.call', { tel: contactTelShort }) }}</a>
      </div>

      <!-- SIGNATURE: conditions board -->
      <div class="board mt-14 mx-auto rounded-2xl px-6 py-5 md:px-8 md:py-6 max-w-3xl">
        <div class="flex items-center justify-between mb-4">
          <span class="tabular-nums text-[11px] uppercase tracking-[0.2em] text-ink-soft">{{ t('hero.boardTitle') }}</span>
          <span class="flex items-center gap-2 tabular-nums text-[11px] text-accent-blue">
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></span>{{ t('hero.online') }}
          </span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_auto] gap-6 tabular-nums">
          <div>
            <div class="board-digit text-2xl md:text-3xl font-medium">0<span class="text-base">cm</span></div>
            <div class="text-ink-soft text-[11px] uppercase tracking-wider mt-1">{{ t('hero.snow') }}</div>
          </div>
          <div>
            <div class="board-digit text-2xl md:text-3xl font-medium">{{ temperatureLabel }}</div>
            <div class="text-ink-soft text-[11px] uppercase tracking-wider mt-1">{{ t('hero.temperature') }}</div>
          </div>
          <div>
            <div class="board-digit text-2xl md:text-3xl font-medium">{{ hoursLabel }}</div>
            <div class="text-ink-soft text-[11px] uppercase tracking-wider mt-1">{{ t('hero.openingHours') }}</div>
          </div>
          <div class="md:ml-8">
            <img src="/icon-camera.png" alt="" class="block w-7 h-7 md:w-8 md:h-8" aria-hidden="true">
            <NuxtLink :to="localePath('/kamery')" class="mt-1 inline-block text-accent-blue underline underline-offset-4 decoration-accent-blue/25 hover:decoration-accent-blue text-sm">{{ t('hero.slopeCameras') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
