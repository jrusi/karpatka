<script setup lang="ts">
const highlights = [
  { title: 'Dzieci', subtitle: 'i dorośli' },
  { title: 'Narty', subtitle: 'i snowboard' },
  { title: 'Solo', subtitle: 'i w grupie' },
]

const features = [
  { title: 'Instruktorzy narciarstwa i snowboardu', desc: 'zajęcia indywidualne i grupowe.' },
  { title: 'Nauka od podstaw na taśmie', desc: 'łagodne, bezpieczne wejście w sport.' },
  { title: 'Pełny sprzęt do wypożyczenia', desc: 'narty, deska, kije i kaski.' },
  { title: 'Wszystko na miejscu', desc: 'zapisy, sprzęt i pierwsza lekcja tego samego dnia.' },
]

const rentalRows = [
  { name: 'Narty carving', day: '40 zł', night: '30 zł' },
  { name: 'Snowboard', day: '40 zł', night: '30 zł' },
]

const lessonRows = [
  { people: '1 osoba', price: '130 zł/h' },
  { people: '2 osoby', price: '210 zł/h' },
  { people: '3 osoby', price: '260 zł/h' },
  { people: '4 osoby', price: '320 zł/h' },
]
</script>

<template>
  <section id="szkola" class="py-24 md:py-32 deep-grad relative overflow-hidden">
    <svg class="absolute inset-0 w-full h-full opacity-[.08]" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path class="sketch-line" stroke="white" d="M-50 520 L180 380 L340 460 L520 300 L650 420 L820 260 L980 440 L1150 340 L1300 460 L1460 380"/>
    </svg>
    <div class="relative max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 items-center">
      <div v-reveal class="reveal order-2 md:order-1 aspect-[4/3] rounded-3xl overflow-hidden border border-white/15">
        <img
          src="/instruktor.jpg"
          alt="Instruktor Karpatki na stoku z dzieckiem podczas nauki jazdy"
          class="w-full h-full object-cover object-top"
        >
      </div>
      <div v-reveal class="reveal order-1 md:order-2">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-ice mb-3">Dla początkujących i nie tylko</p>
        <h2 class="font-display text-3xl md:text-5xl mb-6 text-white">Szkoła narciarska<br>i wypożyczalnia</h2>
        <p class="text-white/65 leading-relaxed mb-7 max-w-md">Nie masz sprzętu? Dopiero zaczynasz przygodę z nartami lub snowboardem? Nasi instruktorzy poprowadzą Cię krok po kroku, a wypożyczalnia zaopatrzy w sprzęt na miejscu — bez wcześniejszych przygotowań.</p>

        <div class="grid grid-cols-3 gap-4 mb-8 font-mono">
          <div v-for="item in highlights" :key="item.title" class="border-t border-white/15 pt-3">
            <div class="text-white text-lg">{{ item.title }}</div>
            <div class="text-white/40 text-[11px] uppercase tracking-wider mt-1">{{ item.subtitle }}</div>
          </div>
        </div>

        <ul class="space-y-4 mb-9">
          <li v-for="feature in features" :key="feature.title" class="flex items-start gap-3">
            <span class="mt-1 w-2 h-2 rounded-full bg-red shrink-0"></span>
            <span class="text-white/85 text-sm"><strong class="font-medium text-white">{{ feature.title }}</strong> — {{ feature.desc }}</span>
          </li>
        </ul>

        <div class="grid sm:grid-cols-2 gap-4 mb-9">
          <div class="rounded-2xl border border-white/15 bg-white/5 overflow-hidden">
            <p class="font-mono text-[11px] uppercase tracking-wider text-white/40 px-5 pt-5 mb-3">Wypożyczalnia</p>
            <div class="grid grid-cols-3 font-mono text-[11px] uppercase tracking-wider text-white/40 px-5 pb-2">
              <span></span>
              <span class="text-right">Dzień*</span>
              <span class="text-right leading-tight">Jazdy nocne<br><span class="normal-case tracking-normal text-white/30">17:00–21:00</span></span>
            </div>
            <div class="divide-y divide-white/10">
              <div v-for="row in rentalRows" :key="row.name" class="grid grid-cols-3 items-center px-5 py-3 font-mono text-sm text-white/85">
                <span>{{ row.name }}</span>
                <span class="text-right text-ice font-medium">{{ row.day }}</span>
                <span class="text-right text-ice font-medium">{{ row.night }}</span>
              </div>
            </div>
            <p class="text-white/35 text-[11px] px-5 py-3 leading-relaxed">Komplet: narty/deska, buty, kije. * w godzinach otwarcia wypożyczalni.</p>
          </div>
          <div class="rounded-2xl border border-white/15 bg-white/5 p-5">
            <p class="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-3">Nauka jazdy (narty / snowboard) · 55 min</p>
            <div class="space-y-2.5 font-mono text-sm">
              <div v-for="row in lessonRows" :key="row.people" class="flex justify-between items-baseline text-white/85">
                <span>{{ row.people }}</span><span class="text-ice font-medium">{{ row.price }}</span>
              </div>
            </div>
            <p class="text-white/35 text-[11px] mt-3 leading-relaxed">Każda kolejna osoba: +60 zł.</p>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <a href="tel:+48512799025" class="bg-red hover:bg-red-deep text-white font-semibold px-7 py-3.5 rounded-full transition-colors">Zapisz się na zajęcia</a>
          <a href="tel:+48512799025" class="border border-white/25 hover:border-white text-white px-7 py-3.5 rounded-full transition-colors font-mono text-sm flex items-center">512 799 025</a>
        </div>
      </div>
    </div>
  </section>
</template>
