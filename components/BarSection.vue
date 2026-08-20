<template>
  <section id="bar" class="py-24 md:py-32 bg-powder">
    <div class="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 items-center">
      <div v-reveal class="reveal">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-purple mb-3">Ogrzej się</p>
        <h2 class="font-display text-3xl md:text-5xl mb-6 text-deep-blue">Bar Karpatka</h2>
        <p class="text-ink-soft leading-relaxed mb-6 max-w-md">Punkt tuż przy wyciągu, czynny w godzinach pracy stoku — gorąca herbata, czekolada i przekąski, żeby się rozgrzać między zjazdami.</p>
        <a href="#kontakt" class="inline-flex items-center gap-2 font-mono text-sm text-purple border-b border-purple/40 hover:border-purple pb-1">Godziny pracy →</a>
      </div>
      <div v-reveal class="reveal aspect-[4/3] rounded-3xl overflow-hidden border border-white">
        <img
          src="/bar.jpg"
          alt="Karczma Karpatka wieczorem, z ogniskiem i miejscami siedzącymi na stoku"
          class="w-full h-full object-cover"
        >
      </div>
    </div>
  </section>
</template>
