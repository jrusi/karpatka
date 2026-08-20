<script setup lang="ts">
defineProps<{
  num: string
  title: string
  desc: string
  link?: { href: string; label: string }
  route?: string
}>()
</script>

<template>
  <NuxtLink
    v-if="route"
    :to="route"
    class="bg-white p-8 group block hover:bg-paper transition-colors cursor-pointer"
  >
    <span class="font-mono text-xs text-accent-blue">{{ num }}</span>
    <h3 class="font-display text-deep-blue text-xl mt-3 mb-2">{{ title }}</h3>
    <p class="text-ink-soft text-sm leading-relaxed mb-3">{{ desc }}</p>
    <span class="font-mono text-xs text-accent-blue underline underline-offset-4 decoration-accent-blue/25 group-hover:decoration-accent-blue inline-flex items-center gap-1">
      Zobacz kamery <span class="transition-transform group-hover:translate-x-1">→</span>
    </span>
  </NuxtLink>
  <div v-else class="bg-white p-8">
    <span class="font-mono text-xs text-accent-blue">{{ num }}</span>
    <h3 class="font-display text-deep-blue text-xl mt-3 mb-2">{{ title }}</h3>
    <p class="text-ink-soft text-sm leading-relaxed" :class="{ 'mb-3': link }">{{ desc }}</p>
    <a
      v-if="link"
      :href="link.href"
      class="font-mono text-xs text-accent-blue underline underline-offset-4 decoration-accent-blue/25 hover:decoration-accent-blue"
    >{{ link.label }}</a>
  </div>
</template>
