<script setup lang="ts">
const { data: hoursData } = await useFetch('/api/opening-hours')

const weekdayText = computed(() => hoursData.value?.weekdayText ?? [])
const isClosedTemporarily = computed(() => hoursData.value?.status === 'closed_temporarily')
</script>

<template>
  <footer id="kontakt" class="deep-grad text-white/70 pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-12 mb-16">
      <div>
        <span class="inline-block bg-white rounded-lg p-2 mb-4">
          <img src="/logo.png" alt="Karpatka — Wyciągi Narciarskie" class="h-12 w-auto">
        </span>
        <p class="text-sm leading-relaxed max-w-xs">Wyciągi narciarskie w Karpaczu — Karkonosze. Miejsce na pierwsze zjazdy dzieci i dorosłych.</p>
      </div>
      <div class="font-mono text-sm space-y-2">
        <p class="text-white/40 uppercase text-xs tracking-wider mb-3">Kontakt</p>
        <p><a href="tel:+48512799025" class="hover:text-white">+48 512 799 025</a></p>
        <p>ul.Myśliwska 3, 58-540 Karpacz</p>
        <p><a href="https://maps.app.goo.gl/mieb4T5tyZQD8sCL8" target="_blank" class="hover:text-white underline underline-offset-4 decoration-white/20">Wskazówki dojazdu →</a></p>
      </div>
      <div class="font-mono text-sm space-y-1">
        <p class="text-white/40 uppercase text-xs tracking-wider mb-3">Godziny otwarcia</p>
        <p v-if="isClosedTemporarily && !weekdayText.length">Obiekt tymczasowo zamknięty</p>
        <p v-else-if="!weekdayText.length">Warunki zależne od pogody</p>
        <p v-for="line in weekdayText" :key="line" class="capitalize">{{ line }}</p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-5 md:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 font-mono text-xs text-white/35">
      <span>© Karpatka — Wyciągi Narciarskie Karpacz</span>
      <span>Prototyp strony · Nuxt + Tailwind CSS</span>
    </div>
  </footer>
</template>
