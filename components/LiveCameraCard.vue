<script setup lang="ts">
defineProps<{
  title: string
  indexLabel: string
  streamUrl?: string
}>()
</script>

<template>
  <div class="group rounded-3xl overflow-hidden bg-deep-blue shadow-[0_30px_60px_-30px_rgba(47,79,115,.5)]">
    <LiveCameraFeed :index-label="indexLabel" :stream-url="streamUrl" />
    <div class="px-6 py-4 font-mono text-xs text-white/50">
      Widok: {{ title }}
    </div>
  </div>
</template>
