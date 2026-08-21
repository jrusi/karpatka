<script setup lang="ts">
const markers = [
  {
    id: 'kasa',
    left: '38%',
    top: '82%',
    label: 'Kasa',
    dotClass: 'w-7 h-7 md:w-10 md:h-10',
    tooltipClass: 'bottom-7 w-40',
    tooltip: 'Kasa — start tutaj, karnety i kaucja za kartę.',
  },
  {
    id: 'parking-1',
    left: '26%',
    top: '88%',
    label: 'Parking',
    dotClass: 'w-6 h-6 md:w-8 md:h-8',
    tooltipClass: 'bottom-6 w-36',
    tooltip: 'Parking — bezpłatny, przy samym stoku.',
  },
  {
    id: 'parking-2',
    left: '46%',
    top: '85%',
    label: 'Parking',
    dotClass: 'w-6 h-6 md:w-8 md:h-8',
    tooltipClass: 'bottom-6 w-36',
    tooltip: 'Drugi parking — kilka kroków od kasy.',
  },
  {
    id: 'wyciag-1',
    left: '46%',
    top: '65%',
    label: 'Wyciąg 1',
    dotClass: 'w-7 h-7 md:w-10 md:h-10',
    tooltipClass: 'bottom-7 w-44',
    tooltip: 'Wyciąg 1 — orczyk, dłuższa trasa.',
  },
  {
    id: 'wyciag-2',
    left: '54%',
    top: '76%',
    label: 'Wyciąg 2',
    dotClass: 'w-7 h-7 md:w-10 md:h-10',
    tooltipClass: 'bottom-7 w-44',
    tooltip: 'Wyciąg 2 — orczyk obok baru.',
  },
  {
    id: 'tasma',
    left: '67%',
    top: '60%',
    label: 'Taśma',
    dotClass: 'w-7 h-7 md:w-10 md:h-10',
    tooltipClass: 'bottom-7 w-48',
    tooltip: 'Taśma — dla początkujących i dzieci.',
  },
  {
    id: 'gorka',
    left: '78%',
    top: '66%',
    label: 'Górka saneczkowa',
    dotClass: 'w-7 h-7 md:w-10 md:h-10',
    tooltipClass: 'bottom-7 w-48',
    tooltip: 'Górka saneczkowa — sanki wliczone w cenę karnetu.',
  },
  {
    id: 'bar',
    left: '61%',
    top: '75%',
    label: 'Bar',
    dotClass: 'w-7 h-7 md:w-10 md:h-10',
    tooltipClass: 'bottom-7 w-44',
    tooltip: 'Bar Karpatka — czynny w godzinach pracy stoku.',
  },
]

const activeId = ref<string | null>(null)

function toggleMarker(id: string) {
  activeId.value = activeId.value === id ? null : id
}

function clearActive() {
  activeId.value = null
}

onMounted(() => document.addEventListener('click', clearActive))
onUnmounted(() => document.removeEventListener('click', clearActive))
</script>

<template>
  <section id="mapa" class="py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal grid md:grid-cols-2 gap-4 items-end mb-12">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">Mapa stoku</p>
          <h2 class="font-display text-3xl md:text-5xl leading-tight text-deep-blue">Zobacz gdzie co jest.</h2>
        </div>
        <p class="text-ink-soft leading-relaxed">Kliknij lub dotknij punktu na mapie, żeby sprawdzić wyciągi, taśmę, górkę saneczkową, kasę, parkingi i bar — wszystko w zasięgu kilkudziesięciu metrów.</p>
      </div>

      <div v-reveal class="reveal relative bg-paper rounded-3xl p-4 md:p-10 overflow-visible">
        <div class="relative aspect-[800/533] rounded-2xl overflow-hidden">
          <img
            src="/mapa-stoku.jpg"
            alt="Mapa stoku Karpatka — wyciągi, taśma, górka saneczkowa, kasa, parkingi i bar"
            class="absolute inset-0 w-full h-full object-cover"
            width="800"
            height="533"
          >

          <!-- markers positioned absolutely over the map image (percentages) -->
          <div class="absolute inset-0">
            <div
              v-for="marker in markers"
              :key="marker.id"
              class="marker-wrap absolute"
              :class="{ active: activeId === marker.id }"
              :style="{ left: marker.left, top: marker.top }"
            >
              <button
                class="marker absolute left-0 top-0 rounded-full bg-transparent focus:outline-none"
                :class="marker.dotClass"
                :aria-label="marker.label"
                @click.stop="toggleMarker(marker.id)"
              ></button>
              <div
                class="tooltip absolute left-1/2 -translate-x-1/2 bg-deep-blue text-white text-xs rounded-lg px-3 py-2 font-mono"
                :class="marker.tooltipClass"
              >{{ marker.tooltip }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
