<script setup lang="ts">
// Expandable questions plus the matching FAQPage structured data. Use once per page.
const props = defineProps<{
  items: { q: string; a: string }[]
}>()

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.items.map(item => ({
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
}))
</script>

<template>
  <div class="board rounded-2xl divide-y divide-deep-blue/8 overflow-hidden">
    <details v-for="item in items" :key="item.q" class="group px-6 py-5 md:px-8 md:py-6">
      <summary class="flex items-center justify-between gap-4 cursor-pointer list-none font-display text-base md:text-lg text-deep-blue">
        {{ item.q }}
        <span class="shrink-0 tabular-nums text-accent-blue transition-transform group-open:rotate-45">+</span>
      </summary>
      <p class="mt-3 text-ink-soft text-sm md:text-base leading-relaxed">{{ item.a }}</p>
    </details>
  </div>
</template>
