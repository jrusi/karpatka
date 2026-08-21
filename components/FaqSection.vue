<script setup lang="ts">
const hourly = pricingRows.find(row => row.label === '1 godz.')!
const daily = pricingRows.find(row => row.label.startsWith('Dzienny'))!
const evening = pricingRows.find(row => row.label.startsWith('Wieczorny'))!
const sled1h = pricingRows.find(row => row.label === 'Górka saneczkowa 1h')!
const sled2h = pricingRows.find(row => row.label === 'Górka saneczkowa 2h')!
const rental = rentalRows[0]
const lessonSolo = lessonRows.find(row => row.people === '1 osoba')!

const faqs = [
  {
    q: 'Ile kosztuje wypożyczenie nart lub snowboardu w Karpaczu?',
    a: `Komplet sprzętu (narty lub snowboard, buty i kije) w wypożyczalni Karpatka kosztuje ${rental.day} za dzień oraz ${rental.night} na jazdy nocne (17:00–21:00).`,
  },
  {
    q: 'Ile kosztuje karnet na wyciąg w Karpatce?',
    a: `Ceny zaczynają się od ${hourly.normal} za godzinę (${hourly.reduced} ulgowy). Karnet dzienny (9:00–16:30) kosztuje ${daily.normal} (${daily.reduced} ulgowy), a wieczorny (16:30–21:00) — ${evening.normal} (${evening.reduced} ulgowy). Pełny cennik karnetów znajdziesz w sekcji Cennik.`,
  },
  {
    q: 'Czy trzeba mieć własny sprzęt narciarski?',
    a: 'Nie. Wypożyczalnia działa na miejscu i zapewnia pełny sprzęt — narty, snowboard, buty i kije — bez wcześniejszych przygotowań.',
  },
  {
    q: 'Czy w Karpatce można nauczyć się jeździć na nartach od podstaw?',
    a: `Tak. Dla początkujących jest łagodna taśma wyciągowa oraz instruktorzy narciarstwa i snowboardu prowadzący zajęcia indywidualne i grupowe (55 minut, od ${lessonSolo.price} za 1 osobę, +60 zł za każdą kolejną osobę).`,
  },
  {
    q: 'Czy jest coś dla najmłodszych dzieci, które jeszcze nie jeżdżą na nartach?',
    a: `Tak — górka saneczkowa (1h za ${sled1h.normal}, 2h za ${sled2h.normal}) oraz taśma dla najmłodszych ułatwiająca pierwsze podejścia do nauki jazdy.`,
  },
  {
    q: 'Gdzie dokładnie znajduje się wyciąg Karpatka?',
    a: 'Wyciągi narciarskie Karpatka mieszczą się przy ul. Myśliwskiej 3 w Karpaczu (58-540), w Karkonoszach, tuż pod Śnieżką, z bezpłatnym parkingiem bezpośrednio przy stoku.',
  },
  {
    q: 'Jakie są aktualne godziny otwarcia stoku i wypożyczalni?',
    a: 'Godziny otwarcia zależą od warunków śniegowych i pogodowych, dlatego aktualizujemy je na bieżąco — sprawdzisz je w tablicy warunków na górze strony oraz w stopce.',
  },
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }),
    },
  ],
})
</script>

<template>
  <section id="faq" class="py-24 md:py-32 bg-paper">
    <div class="max-w-3xl mx-auto px-5 md:px-8">
      <div v-reveal class="reveal mb-12">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">Warto wiedzieć</p>
        <h2 class="font-display text-3xl md:text-5xl text-deep-blue">Najczęściej zadawane pytania</h2>
      </div>

      <div v-reveal class="reveal board rounded-2xl divide-y divide-deep-blue/8 overflow-hidden">
        <details v-for="item in faqs" :key="item.q" class="group px-6 py-5 md:px-8 md:py-6">
          <summary class="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-base md:text-lg text-deep-blue">
            {{ item.q }}
            <span class="shrink-0 font-mono text-accent-blue transition-transform group-open:rotate-45">+</span>
          </summary>
          <p class="mt-3 text-ink-soft text-sm md:text-base leading-relaxed">{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
