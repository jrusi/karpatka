<template>
  <section id="kamery" class="py-24 md:py-32 bg-paper">
    <div class="max-w-5xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal text-center mb-12">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">Kamery on-line (na żywo)</p>
        <h2 class="font-display text-3xl md:text-5xl text-deep-blue mb-4">Sprwdź warunki na stoku - na żywo (live).</h2>
        <p class="text-ink-soft max-w-lg mx-auto">Trzy kamery na żywo: widok z Chatki Karpatki, z kasy oraz na górną stację wyciągu.</p>
      </div>

      <div v-reveal class="reveal">
        <div class="rounded-3xl overflow-hidden bg-deep-blue shadow-[0_30px_60px_-30px_rgba(47,79,115,.5)]">
          <LiveCameraFeed
            index-label="Kamera 3 z 3"
            stream-url="https://stream2.wyciag-karpacz.pl/3/video.m3u8"
          />
          <div class="flex items-center justify-between px-6 py-4 font-mono text-xs text-white/50">
            <span>Widok: Taśma i bar (w zimie), Sokoliki i Krzyżna góra (lato)</span>
            <NuxtLink to="/kamery" class="group text-ice hover:text-white flex items-center gap-2 transition-colors">
              Zobacz pozostałe kamery <span class="transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
