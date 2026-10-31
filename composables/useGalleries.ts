import type { GalleryPhoto } from '~/components/PhotoGallery.vue'

// Photo sets shared by the home page sections and the landing pages.

// The instructor photo stays first; the rest come from the school photo set.
export function useSchoolGallery() {
  const { t } = useI18n()
  const portraitPhotos = new Set([5, 6, 7])
  return computed<GalleryPhoto[]>(() => [
    { src: '/instruktor.jpg', thumb: '/szkola/instruktor-thumb.webp', alt: t('school.imageAlt') },
    ...[1, 2, 3, 4, 5, 6, 7].map(n => ({
      src: `/szkola/szkola-${n}.webp`,
      thumb: `/szkola/szkola-${n}-thumb.webp`,
      alt: t(`school.galleryAlt.p${n}`),
      contain: portraitPhotos.has(n),
    })),
  ])
}

// Photo 6 is a wide two-camera webcam strip, so it is shown whole rather than cropped.
export function useSlopeGallery({ withVideo = true } = {}) {
  const { t } = useI18n()
  const photo = (n: number): GalleryPhoto => ({
    src: `/stok/stok-${n}.webp`,
    thumb: `/stok/stok-${n}-thumb.webp`,
    alt: t(`offer.galleryAlt.p${n}`),
    contain: n === 6,
  })
  return computed<GalleryPhoto[]>(() => [
    ...[8, 4, 5, 1, 2, 3, 7, 6].map(photo),
    ...(withVideo
      ? [{
          src: '/stok/karpatka-film-poster.webp',
          thumb: '/stok/karpatka-film-thumb.webp',
          alt: t('offer.galleryAlt.video'),
          video: '/stok/karpatka-film.mp4',
        }]
      : []),
  ])
}
