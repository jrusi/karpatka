<script setup lang="ts">
const isSolid = ref(false)
const isMenuOpen = ref(false)

function onScroll() {
  isSolid.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function closeMenu() {
  isMenuOpen.value = false
}

const menuButtonRef = ref<HTMLElement | null>(null)
const menuPanelRef = ref<HTMLElement | null>(null)

function handleOutsideClick(event: MouseEvent) {
  if (!isMenuOpen.value) return
  const target = event.target as Node
  if (menuButtonRef.value?.contains(target)) return
  if (menuPanelRef.value?.contains(target)) return
  closeMenu()
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

const navLinks = [
  { href: '/kamery', label: 'Kamery na żywo' },
  { href: '/#cennik', label: 'Cennik' },
  { href: '/#szkola', label: 'Szkoła' },
  { href: '/#bar', label: 'Bar' },
  { href: '/#mapa', label: 'Mapa stoku' },
  { href: '/#kontakt', label: 'Kontakt' },
]
</script>

<template>
  <header
    id="site-header"
    class="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
    :class="{ solid: isSolid }"
  >
    <div class="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
      <NuxtLink to="/" class="flex items-center gap-3" @click="closeMenu">
        <img src="/logo.png" alt="Karpatka — Wyciągi Narciarskie" class="h-11 md:h-16 w-auto">
      </NuxtLink>
      <nav class="hidden lg:flex items-center gap-8 font-mono text-[13px] uppercase tracking-wider text-ink-soft">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="hover:text-deep-blue transition-colors"
        >{{ link.label }}</NuxtLink>
      </nav>
      <a
        href="tel:+48512799025"
        class="hidden lg:inline-flex items-center gap-2 border border-deep-blue/25 hover:border-accent-blue hover:text-accent-blue text-deep-blue rounded-full px-5 py-2 font-mono text-[13px] transition-colors"
      >
        +48 512 799 025
      </a>
      <button ref="menuButtonRef" aria-label="Otwórz menu" class="lg:hidden text-deep-blue" @click="isMenuOpen = !isMenuOpen">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
    <div
      v-show="isMenuOpen"
      ref="menuPanelRef"
      class="lg:hidden bg-frost border-t border-deep-blue/10 px-5 pb-6 pt-4 flex flex-col gap-4 font-mono text-sm uppercase tracking-wider text-ink-soft"
    >
      <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" @click="closeMenu">{{ link.label }}</NuxtLink>
      <a href="tel:+48512799025" class="text-accent-blue" @click="closeMenu">+48 512 799 025</a>
    </div>
  </header>
</template>
