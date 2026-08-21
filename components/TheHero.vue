<script setup lang="ts">
const { data: temperatureData, refresh: refreshTemperature } = await useFetch('/api/temperature')
const { data: hoursData } = await useFetch('/api/opening-hours')

const temperatureLabel = computed(() => {
  const value = temperatureData.value?.temperature
  if (value === null || value === undefined) return '—°'
  return `${Math.round(value)}°`
})

const hoursLabel = computed(() => hoursData.value?.label ?? '—')

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
    </div>

    <div class="relative max-w-7xl mx-auto px-5 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-10 gap-y-5 md:items-center">
        <p class="md:col-start-1 md:row-start-1 text-center font-mono text-[13px] uppercase tracking-[0.2em] text-accent-blue">Karpacz · Karkonosze · Wyciąg</p>
        <img
          src="/logo.png"
          alt="Karpatka — Wyciągi Narciarskie"
          class="md:col-start-2 md:row-start-1 md:row-span-2 h-28 md:h-36 lg:h-44 w-auto shrink-0 justify-self-center md:justify-self-end"
        >
        <h1 class="md:col-start-1 md:row-start-2 min-w-0 font-display text-deep-blue text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
          Wyciągi narciarskie w Karpaczu<br class="hidden md:block"> <span class="italic font-medium text-accent-blue"> nauka jazdy na nartach.</span>
        </h1>
      </div>
      <p class="mt-6 text-ink-soft max-w-xl text-base md:text-lg leading-relaxed">
        Dwa wyciągi orczykowe, taśma dla najmłodszych i górka saneczkowa — tuż pod Śnieżką, z bezpłatnym parkingiem przy samym stoku.
      </p>
      <div class="mt-9 flex flex-wrap gap-4">
        <a href="#cennik" class="bg-red hover:bg-red-deep text-white font-semibold px-7 py-3.5 rounded-full transition-colors">Zobacz cennik</a>
        <a href="tel:+48512799025" class="bg-white/90 backdrop-blur-sm border border-deep-blue/25 hover:border-accent-blue text-deep-blue px-7 py-3.5 rounded-full transition-colors font-mono text-sm flex items-center shadow-sm">Zadzwoń: 512 799 025</a>
      </div>

      <!-- SIGNATURE: conditions board -->
      <div class="board mt-14 rounded-2xl px-6 py-5 md:px-8 md:py-6 max-w-3xl">
        <div class="flex items-center justify-between mb-4">
          <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">Tablica warunków · aktualizacja na żywo</span>
          <span class="flex items-center gap-2 font-mono text-[11px] text-accent-blue">
            <span class="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></span>ONLINE
          </span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
          <div>
            <div class="board-digit text-2xl md:text-3xl font-medium">0<span class="text-base">cm</span></div>
            <div class="text-ink-soft text-[11px] uppercase tracking-wider mt-1">Pokrywa śnieżna</div>
          </div>
          <div>
            <div class="board-digit text-2xl md:text-3xl font-medium">{{ temperatureLabel }}</div>
            <div class="text-ink-soft text-[11px] uppercase tracking-wider mt-1">Temperatura</div>
          </div>
          <div>
            <div class="board-digit text-2xl md:text-3xl font-medium">{{ hoursLabel }}</div>
            <div class="text-ink-soft text-[11px] uppercase tracking-wider mt-1">Godziny otwarcia</div>
          </div>
          <div>
            <img src="/icon-camera.png" alt="" class="block w-7 h-7 md:w-8 md:h-8" aria-hidden="true">
            <NuxtLink to="/kamery" class="mt-1 inline-block text-accent-blue underline underline-offset-4 decoration-accent-blue/25 hover:decoration-accent-blue text-sm">Kamery na stoku →</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
