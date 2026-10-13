<script setup lang="ts">
const { t } = useI18n()
const { status, weekLines } = await useOpeningHours()

const isClosedTemporarily = computed(() => status.value === 'closed_temporarily')
</script>

<template>
  <footer id="kontakt" class="deep-grad text-white/70 pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-12 mb-16">
      <div>
        <span class="inline-block bg-white rounded-lg p-2 mb-4">
          <img src="/logo.png" :alt="t('common.logoAlt')" class="h-12 w-auto">
        </span>
        <p class="text-sm leading-relaxed max-w-xs">{{ t('footer.about') }}</p>
      </div>
      <div class="font-mono text-sm space-y-2">
        <p class="text-white/40 uppercase text-xs tracking-wider mb-3">{{ t('footer.contact') }}</p>
        <p><a :href="contactTelHref" class="hover:text-white">{{ contactTel }}</a></p>
        <p>ul.Myśliwska 3, 58-540 Karpacz</p>
        <p><a href="https://www.google.com/maps/search/?api=1&query=Karpatka+wyci%C4%85g+narciarski%2C+ul.+My%C5%9Bliwska+3%2C+58-540+Karpacz" target="_blank" class="hover:text-white underline underline-offset-4 decoration-white/20">{{ t('footer.directions') }}</a></p>
      </div>
      <div class="font-mono text-sm space-y-1">
        <p class="text-white/40 uppercase text-xs tracking-wider mb-3">{{ t('footer.openingHours') }}</p>
        <p v-if="isClosedTemporarily && !weekLines.length">{{ t('hours.closedTemporarily') }}</p>
        <p v-else-if="!weekLines.length">{{ t('hours.weatherDependent') }}</p>
        <p v-for="line in weekLines" :key="line" class="capitalize">{{ line }}</p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-5 md:px-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 font-mono text-xs text-white/35">
      <span>{{ t('footer.copyright') }}</span>
    </div>
  </footer>
</template>
