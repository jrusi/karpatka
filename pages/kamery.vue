<script setup lang="ts">
useHead({
  title: 'Kamery na żywo — Karpatka',
})

const cameras = [
  {
    title: 'Chatka Karpatki',
    indexLabel: 'Kamera 1 z 3',
    streamUrl: 'https://stream1.wyciag-karpacz.pl/video.m3u8',
  },
  {
    title: 'Kasa',
    indexLabel: 'Kamera 2 z 3',
    streamUrl: 'https://stream1.wyciag-karpacz.pl/2/video.m3u8',
  },
  {
    title: 'Górna stacja wyciągu',
    indexLabel: 'Kamera 3 z 3',
    streamUrl: 'https://stream2.wyciag-karpacz.pl/3/video.m3u8',
  },
]
</script>

<template>
  <section class="pt-32 pb-24 md:pt-44 md:pb-32 bg-paper">
    <div class="max-w-7xl mx-auto px-5 md:px-8">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">Kamery on-line (na żywo)</p>
      <h1 class="font-display text-3xl md:text-5xl text-deep-blue mb-4 max-w-2xl">Zerknij na stok, zanim spakujesz auto.</h1>
      <p class="text-ink-soft max-w-lg mb-14 leading-relaxed">Trzy kamery na żywo: widok z Chatki Karpatki, z kasy oraz na górną stację wyciągu — wszystkie w jednym miejscu.</p>

      <div class="grid md:grid-cols-3 gap-6">
        <LiveCameraCard
          v-for="camera in cameras"
          :key="camera.title"
          :title="camera.title"
          :index-label="camera.indexLabel"
          :stream-url="camera.streamUrl"
        />
      </div>

      <p class="font-mono text-[11px] text-ink-soft/70 mt-8">* podgląd na żywo, zależny od stabilności połączenia kamer na stoku</p>

      <div class="mt-10 flex justify-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 border border-deep-blue/25 hover:border-accent-blue hover:text-accent-blue text-deep-blue px-7 py-3.5 rounded-full transition-colors font-mono text-sm"
        >
          ← Powrót do strony głównej
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
