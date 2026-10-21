<script setup lang="ts">
export interface GalleryPhoto {
  src: string
  thumb: string
  alt: string
  // Shown whole (letterboxed) instead of cropped to the frame — for portrait or very wide shots.
  contain?: boolean
  // Makes the slide a video; `src` is then its poster image and `alt` its accessible name.
  video?: string
}

const props = withDefaults(defineProps<{
  photos: GalleryPhoto[]
  theme?: 'dark' | 'light'
  // 16:9 frame and thumbnails instead of 4:3, for sets of wide landscape photos.
  wide?: boolean
}>(), { theme: 'dark', wide: false })

const { t } = useI18n()

const aspect = computed(() => props.wide ? 'aspect-video' : 'aspect-[4/3]')
const frameBorder = computed(() => props.theme === 'dark' ? 'border-white/15' : 'border-white')
const thumbBorder = computed(() => props.theme === 'dark'
  ? 'border-white/15 hover:border-white/60'
  : 'border-white hover:border-purple/60')

// The thumbnails always show the (up to three) photos that follow the current one.
const active = ref(0)
const upcoming = computed(() => {
  const count = Math.min(3, props.photos.length - 1)
  return Array.from({ length: count }, (_, i) => (active.value + i + 1) % props.photos.length)
})
const go = (step: number) => {
  active.value = (active.value + step + props.photos.length) % props.photos.length
}

// Stop a playing video once its slide is no longer shown.
const track = ref<HTMLElement | null>(null)
watch(active, () => {
  track.value?.querySelectorAll('video').forEach(video => video.pause())
})

// Swipe: the track follows the finger, and a drag past the threshold changes the photo.
const SWIPE_THRESHOLD = 50
const dragging = ref(false)
const dragX = ref(0)
let startX = 0
let startY = 0
let pointerId: number | null = null
const onPointerDown = (e: PointerEvent) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  // Native video controls (seek bar, volume) need horizontal drags, so videos are navigated with arrows/thumbnails.
  if ((e.target as HTMLElement).closest('button, video')) return
  pointerId = e.pointerId
  startX = e.clientX
  startY = e.clientY
}
const onPointerMove = (e: PointerEvent) => {
  if (e.pointerId !== pointerId) return
  const dx = e.clientX - startX
  if (!dragging.value) {
    // Leave mostly vertical gestures to page scrolling.
    if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(e.clientY - startY)) return
    dragging.value = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  dragX.value = dx
}
const onPointerUp = (e: PointerEvent) => {
  if (e.pointerId !== pointerId) return
  pointerId = null
  if (dragging.value && Math.abs(dragX.value) > SWIPE_THRESHOLD) go(dragX.value < 0 ? 1 : -1)
  dragging.value = false
  dragX.value = 0
}
</script>

<template>
  <div>
    <div
      class="relative rounded-3xl overflow-hidden border bg-black/30 touch-pan-y select-none"
      :class="[aspect, frameBorder]"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <!-- Every slide is in the markup so crawlers see all photos and their alt text. -->
      <div
        ref="track"
        class="flex h-full"
        :class="dragging ? '' : 'transition-transform duration-300 ease-out'"
        :style="{ transform: `translateX(calc(${-active * 100}% + ${dragX}px))` }"
      >
        <template v-for="(photo, i) in photos" :key="photo.src">
          <!-- preload="none": nothing beyond the poster is downloaded until the visitor presses play. -->
          <video
            v-if="photo.video"
            :src="photo.video"
            :poster="photo.src"
            :aria-label="photo.alt"
            :title="photo.alt"
            :aria-hidden="i !== active"
            :tabindex="i === active ? undefined : -1"
            controls
            playsinline
            preload="none"
            class="w-full h-full shrink-0 object-cover bg-black"
          ></video>
          <img
            v-else
            :src="photo.src"
            :alt="photo.alt"
            :loading="i === 0 ? 'eager' : 'lazy'"
            :aria-hidden="i !== active"
            decoding="async"
            draggable="false"
            class="w-full h-full shrink-0"
            :class="photo.contain ? 'object-contain' : 'object-cover object-top'"
          >
        </template>
      </div>
      <button
        type="button"
        :aria-label="t('common.gallery.prev')"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white text-xl flex items-center justify-center transition-colors"
        @click="go(-1)"
      >‹</button>
      <button
        type="button"
        :aria-label="t('common.gallery.next')"
        class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white text-xl flex items-center justify-center transition-colors"
        @click="go(1)"
      >›</button>
      <span v-if="!photos[active].video" class="absolute bottom-3 right-4 tabular-nums text-[11px] text-white/80 bg-black/40 rounded-full px-2.5 py-1">{{ active + 1 }} / {{ photos.length }}</span>
    </div>
    <div class="grid grid-cols-3 gap-3 mt-3">
      <button
        v-for="i in upcoming"
        :key="photos[i].src"
        type="button"
        :aria-label="photos[i].video ? t('common.gallery.showVideo') : t('common.gallery.show', { n: i + 1 })"
        class="relative rounded-xl overflow-hidden border transition-colors"
        :class="[aspect, thumbBorder]"
        @click="active = i"
      >
        <img :src="photos[i].thumb" alt="" loading="lazy" class="w-full h-full object-cover">
        <span v-if="photos[i].video" class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span class="w-9 h-9 rounded-full bg-black/50 text-white text-sm flex items-center justify-center pl-0.5">▶</span>
        </span>
      </button>
    </div>
  </div>
</template>
