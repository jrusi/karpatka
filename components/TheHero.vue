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
  <section id="top" class="sky-grad relative overflow-hidden pt-[4.5rem] pb-20 md:pt-44 md:pb-28">
    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F1F7FC"/>
          <stop offset="100%" stop-color="#DCEAF6"/>
        </linearGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#DCEAF6"/>
          <stop offset="100%" stop-color="#B9D6EC"/>
        </linearGradient>
        <symbol id="pine" viewBox="0 0 40 60">
          <rect x="18" y="50" width="4" height="9" fill="var(--line-blue)"/>
          <path d="M20 2 L29 20 L24 20 L32 34 L26 34 L36 50 L4 50 L14 34 L8 34 L16 20 L11 20 Z" fill="var(--line-blue)"/>
          <path d="M20 2 L23.5 10 L16.5 10 Z" fill="#fff" opacity=".65"/>
          <path d="M20 15 L26.5 27 L13.5 27 Z" fill="#fff" opacity=".3"/>
        </symbol>
      </defs>

      <path d="M-50,560 C180,455 340,525 560,435 C820,330 1040,475 1300,400 L1460,430 L1460,700 L-50,700 Z" fill="url(#hillFar)"/>
      <g opacity=".4">
        <use href="#pine" x="40" y="465" width="24" height="36"/>
        <use href="#pine" x="150" y="490" width="18" height="27"/>
        <use href="#pine" x="330" y="475" width="20" height="30"/>
        <use href="#pine" x="500" y="450" width="16" height="24"/>
        <use href="#pine" x="700" y="415" width="20" height="30"/>
        <use href="#pine" x="900" y="440" width="18" height="27"/>
        <use href="#pine" x="1080" y="410" width="22" height="33"/>
        <use href="#pine" x="1250" y="420" width="18" height="27"/>
        <use href="#pine" x="1370" y="440" width="20" height="30"/>
      </g>

      <path class="sketch-line sketch-draw" style="opacity:.25" d="M-50 520 L180 380 L340 460 L520 300 L650 420 L820 260 L980 440 L1150 340 L1300 460 L1460 380"/>
      <path class="sketch-line sketch-draw" style="opacity:.25; animation-delay:.5s" d="M-50 600 L220 480 L440 560 L680 420 L900 540 L1120 440 L1460 560"/>

      <path d="M-50,650 C220,555 420,630 680,555 C920,490 1140,615 1460,555 L1460,700 L-50,700 Z" fill="url(#hillNear)"/>
      <g opacity=".7">
        <use href="#pine" x="-10" y="555" width="70" height="105"/>
        <use href="#pine" x="55" y="595" width="52" height="78"/>
        <use href="#pine" x="115" y="615" width="38" height="57"/>
        <use href="#pine" x="1300" y="560" width="60" height="90"/>
        <use href="#pine" x="1355" y="600" width="48" height="72"/>
        <use href="#pine" x="1400" y="625" width="36" height="54"/>
      </g>
    </svg>

    <div class="relative max-w-7xl mx-auto px-5 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-10 gap-y-5 md:items-center">
        <p class="md:col-start-1 md:row-start-1 text-center font-mono text-[13px] uppercase tracking-[0.2em] text-accent-blue">Karpacz · Karkonosze · Wyciąg</p>
        <img
          src="/logo.png"
          alt="Karpatka — Wyciągi Narciarskie"
          class="md:col-start-2 md:row-start-1 md:row-span-2 h-28 md:h-36 lg:h-44 w-auto shrink-0 justify-self-center md:justify-self-end"
        >
        <h1 class="md:col-start-1 md:row-start-2 min-w-0 font-display text-deep-blue text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl">
          Wyciągi narciarskie w Karpaczu<br class="hidden md:block"> <span class="italic font-medium text-accent-blue">z nauką jazdy na nartach.</span>
        </h1>
      </div>
      <p class="mt-6 text-ink-soft max-w-xl text-base md:text-lg leading-relaxed">
        Dwa wyciągi orczykowe, taśma dla najmłodszych i górka saneczkowa — tuż pod Śnieżką, z bezpłatnym parkingiem przy samym stoku.
      </p>
      <div class="mt-9 flex flex-wrap gap-4">
        <a href="#cennik" class="bg-red hover:bg-red-deep text-white font-semibold px-7 py-3.5 rounded-full transition-colors">Zobacz cennik</a>
        <a href="tel:+48512799025" class="border border-deep-blue/25 hover:border-accent-blue text-deep-blue px-7 py-3.5 rounded-full transition-colors font-mono text-sm flex items-center">Zadzwoń: 512 799 025</a>
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
