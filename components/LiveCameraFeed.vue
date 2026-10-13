<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    indexLabel: string
    streamUrl?: string
    controls?: boolean
  }>(),
  { controls: true },
)

const { t } = useI18n()

const rootRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
let hls: import('hls.js').default | null = null
let started = false
let observer: IntersectionObserver | null = null

// Start the stream (and load hls.js, ~180 KB) only once the camera scrolls
// into view, and stop downloading video while it's off screen — otherwise
// the home page streams video and blocks the main thread on every visit.
async function start() {
  const video = videoRef.value
  if (!props.streamUrl || !video) return
  started = true

  const { default: Hls } = await import('hls.js')

  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(props.streamUrl)
    hls.attachMedia(video)
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = props.streamUrl
  }
}

function onVisibilityChange(visible: boolean) {
  if (visible && !started) {
    start()
    return
  }
  if (!started) return
  if (visible) {
    hls?.startLoad()
    videoRef.value?.play().catch(() => {})
  } else {
    hls?.stopLoad()
    videoRef.value?.pause()
  }
}

onMounted(() => {
  if (!props.streamUrl || !rootRef.value) return
  observer = new IntersectionObserver(
    ([entry]) => onVisibilityChange(entry.isIntersecting),
    { rootMargin: '200px 0px' },
  )
  observer.observe(rootRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
  hls?.destroy()
  hls = null
})
</script>

<template>
  <div ref="rootRef" class="relative aspect-video bg-gradient-to-br from-[#3A5D82] via-deep-blue to-deep-blue-2 flex items-center justify-center overflow-hidden">
    <video
      v-if="streamUrl"
      ref="videoRef"
      class="absolute inset-0 w-full h-full object-contain"
      autoplay
      muted
      playsinline
      :controls="controls"
    ></video>

    <template v-else>
      <svg class="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 900 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path class="sketch-line" stroke="white" d="M-20 340 L140 260 L260 310 L400 210 L520 290 L660 190 L800 300 L920 250"/>
        <g fill="white" opacity=".5">
          <path d="M100 400 L118 350 L136 400 Z"/>
          <path d="M220 400 L240 340 L260 400 Z"/>
          <path d="M700 400 L718 350 L736 400 Z"/>
        </g>
      </svg>
      <span class="relative w-14 h-14 rounded-full bg-white/15 group-hover:bg-white/25 backdrop-blur flex items-center justify-center transition-colors">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
      </span>
    </template>

    <span class="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur px-3 py-1.5 rounded-full font-mono text-[11px] text-white pointer-events-none">
      <span class="w-1.5 h-1.5 rounded-full bg-red animate-pulse"></span>{{ t('cameras.live') }}
    </span>
  </div>
</template>
