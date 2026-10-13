<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

// Shown as PL / EN / DE / CZ — Czech's language code is "cs", but "CZ" is
// what Czech visitors look for.
function localeLabel(code: string) {
  return code === 'cs' ? 'CZ' : code.toUpperCase()
}

const isSolid = ref(false)
const isMenuOpen = ref(false)

function onScroll() {
  isSolid.value = window.scrollY > 40
  updateActiveSection()
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

const route = useRoute()

function handleLogoClick() {
  closeMenu()
  if (route.path === localePath('/')) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
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

// Scroll-spy for the home page: the active section is the last one whose top
// has passed the upper third of the viewport (or the last one at page bottom).
const activeSection = ref<string | null>(null)

function updateActiveSection() {
  if (route.path !== localePath('/')) {
    activeSection.value = null
    return
  }
  const ids = navLinks.filter((l) => l.section).map((l) => l.section!)
  const sections = ids
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => !!el)
    .sort((a, b) => a.offsetTop - b.offsetTop)
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  let current: string | null = null
  for (const el of sections) {
    if (el.getBoundingClientRect().top <= window.innerHeight / 3) current = el.id
  }
  if (atBottom && sections.length) current = sections[sections.length - 1].id
  activeSection.value = current
}

watch(() => route.fullPath, () => nextTick(updateActiveSection))

function isActive(link: NavLink) {
  if (link.section) return activeSection.value === link.section
  return route.path === localePath(link.path)
}

function linkTo(link: NavLink) {
  return link.section ? `${localePath('/')}#${link.section}` : localePath(link.path)
}

onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))

interface NavLink {
  key: string
  path: string
  section?: string
}

// Either a page (path) or a section of the home page (section = element id).
const navLinks: NavLink[] = [
  { key: 'cameras', path: '/kamery' },
  { key: 'pricing', path: '/', section: 'cennik' },
  { key: 'school', path: '/', section: 'szkola' },
  { key: 'bar', path: '/', section: 'bar' },
  { key: 'map', path: '/', section: 'mapa' },
  { key: 'faq', path: '/', section: 'faq' },
  { key: 'contact', path: '/', section: 'kontakt' },
]
</script>

<template>
  <header
    id="site-header"
    class="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
    :class="{ solid: isSolid }"
  >
    <div class="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-3" @click="handleLogoClick">
        <img src="/logo.png" :alt="t('common.logoAlt')" class="h-11 md:h-16 w-auto">
      </NuxtLink>
      <nav class="hidden lg:flex items-center gap-5 xl:gap-8 whitespace-nowrap font-mono text-[13px] uppercase tracking-wider text-ink-soft">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="linkTo(link)"
          class="hover:text-deep-blue transition-colors border-b-2 pb-0.5"
          :class="isActive(link) ? 'text-deep-blue border-accent-blue' : 'border-transparent'"
          :aria-current="isActive(link) ? 'location' : undefined"
        >{{ t(`nav.${link.key}`) }}</NuxtLink>
      </nav>
      <div class="hidden lg:flex items-center gap-3 xl:gap-5">
        <nav :aria-label="t('nav.language')" class="flex items-center gap-1 font-mono text-[13px]">
          <NuxtLink
            v-for="l in locales"
            :key="l.code"
            :to="switchLocalePath(l.code)"
            :lang="l.language"
            :title="l.name"
            class="px-1.5 py-0.5 rounded transition-colors"
            :class="l.code === locale ? 'text-deep-blue font-semibold' : 'text-ink-soft hover:text-deep-blue'"
            :aria-current="l.code === locale ? 'true' : undefined"
          >{{ localeLabel(l.code) }}</NuxtLink>
        </nav>
        <a
          :href="contactTelHref"
          class="inline-flex items-center gap-2 border border-deep-blue/25 hover:border-accent-blue hover:text-accent-blue text-deep-blue rounded-full px-5 py-2 font-mono text-[13px] transition-colors"
        >
          {{ contactTel }}
        </a>
      </div>
      <button ref="menuButtonRef" :aria-label="t('nav.openMenu')" class="lg:hidden text-deep-blue" @click="isMenuOpen = !isMenuOpen">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
    <div
      v-show="isMenuOpen"
      ref="menuPanelRef"
      class="lg:hidden bg-frost border-t border-deep-blue/10 px-5 pb-6 pt-4 flex flex-col gap-4 font-mono text-sm uppercase tracking-wider text-ink-soft"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.key"
        :to="linkTo(link)"
        class="border-l-2 pl-3 -ml-3.5"
        :class="isActive(link) ? 'text-deep-blue border-accent-blue' : 'border-transparent'"
        :aria-current="isActive(link) ? 'location' : undefined"
        @click="closeMenu"
      >{{ t(`nav.${link.key}`) }}</NuxtLink>
      <a :href="contactTelHref" class="text-accent-blue" @click="closeMenu">{{ contactTel }}</a>
      <nav :aria-label="t('nav.language')" class="flex items-center gap-2 pt-2 border-t border-deep-blue/10">
        <NuxtLink
          v-for="l in locales"
          :key="l.code"
          :to="switchLocalePath(l.code)"
          :lang="l.language"
          :title="l.name"
          class="px-2 py-1 rounded"
          :class="l.code === locale ? 'bg-deep-blue text-white' : 'text-ink-soft'"
          :aria-current="l.code === locale ? 'true' : undefined"
          @click="closeMenu"
        >{{ localeLabel(l.code) }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>
