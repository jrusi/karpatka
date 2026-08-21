<template>
  <section class="relative z-10 -mt-1 bg-paper">
    <div class="max-w-5xl mx-auto px-5 md:px-8">
      <a
        v-reveal
        href="#szkola"
        class="reveal group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-deep-blue hover:bg-deep-blue-2 transition-colors rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-[0_20px_40px_-20px_rgba(47,79,115,.4)]"
      >
        <span class="flex items-center gap-4">
          <span class="shrink-0 w-11 h-11 rounded-full bg-red flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>
          </span>
          <span>
            <span class="block font-display text-white text-lg md:text-xl">Pierwszy raz na nartach albo desce?</span>
            <span class="block text-white/60 text-sm mt-0.5">Zacznij od Szkoły nauki jazdy — instruktorzy i sprzęt czekają na miejscu.</span>
          </span>
        </span>
        <span class="font-mono text-xs uppercase tracking-wider text-ice group-hover:text-white flex items-center gap-2 shrink-0">
          Poznaj szkołę <span class="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </a>
    </div>
  </section>
</template>
