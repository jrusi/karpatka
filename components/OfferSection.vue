<script setup lang="ts">
const items = [
  {
    num: '01',
    title: 'Dwa wyciągi orczykowe',
    desc: 'Wyciąg 1 i Wyciąg 2 — dla jeżdżących pewniej, z krótkim czasem oczekiwania.',
  },
  {
    num: '02',
    title: 'Taśma dla początkujących',
    desc: 'Łagodne wejście dla dzieci i osób stawiających pierwsze kroki na nartach.',
  },
  {
    num: '03',
    title: 'Górka saneczkowa',
    desc: 'Sanki w cenie karnetu — dobra opcja, gdy narty czekają na kolejny dzień.',
  },
  {
    num: '04',
    title: 'Szkoła i wypożyczalnia',
    desc: 'Sprzęt na miejscu i instruktorzy narciarstwa oraz snowboardu.',
    link: { href: '#szkola', label: 'Zobacz szczegóły →' },
  },
  {
    num: '05',
    title: 'Bezpłatny parking',
    desc: 'Bezpośrednio przy stoku — bez doliczania do ceny karnetu.',
  },
  {
    num: '06',
    title: 'Kamery na żywo',
    desc: 'Podgląd na stok, kasę i górną stację — warunki sprawdzisz zanim wyjedziesz.',
    route: '/kamery',
  },
]
</script>

<template>
  <section id="oferta" class="py-24 md:py-32 bg-paper relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 md:px-8 relative">
      <p v-reveal class="reveal font-mono text-xs uppercase tracking-[0.2em] text-accent-blue mb-3">Co znajdziesz na miejscu</p>
      <h2 v-reveal class="reveal font-display text-deep-blue text-3xl md:text-5xl mb-14 max-w-2xl">Wszystko, czego potrzebujesz w jednym miejscu.</h2>

      <div v-reveal class="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-deep-blue/10 rounded-2xl overflow-hidden">
        <OfferCard
          v-for="item in items"
          :key="item.num"
          :num="item.num"
          :title="item.title"
          :desc="item.desc"
          :link="item.link"
          :route="item.route"
        />
      </div>
    </div>
  </section>
</template>
