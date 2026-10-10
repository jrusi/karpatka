function formatTime(time: string): string {
  // "0900" -> "9", "0930" -> "9:30"
  const hours = parseInt(time.slice(0, 2), 10)
  const minutes = time.slice(2, 4)
  return minutes === '00' ? `${hours}` : `${hours}:${minutes}`
}

export default defineEventHandler(async () => {
  // Storage read can fail transiently (e.g. Netlify Blobs on a cold start) and
  // is empty until the first scheduled refresh — in both cases fetch from
  // Google on demand instead of falling back to the generic footer text.
  let stored = await getStoredOpeningHours().catch((err) => {
    console.error('[opening-hours] storage read failed:', err)
    return null
  })
  if (!stored) {
    stored = await fetchAndStoreOpeningHours().catch((err) => {
      console.error('[opening-hours] on-demand fetch failed:', err)
      return null
    })
  }

  if (!stored) {
    return { status: 'unknown', label: null, weekdayText: [] }
  }

  const weekdayText = stored.weekdayText

  if (stored.businessStatus === 'CLOSED_TEMPORARILY') {
    return { status: 'closed_temporarily', label: 'Zamknięte', weekdayText }
  }

  // Google's period.open.day: 0 = Sunday ... 6 = Saturday — matches Date#getDay().
  const today = new Date().getDay()
  const todayPeriods = stored.periods.filter((p) => p.open?.day === today)

  if (todayPeriods.length === 0) {
    return { status: 'closed_today', label: 'Zamknięte', weekdayText }
  }

  const ranges = todayPeriods.map((p) => {
    if (!p.close) return 'całą dobę'
    return `${formatTime(p.open.time)}–${formatTime(p.close.time)}`
  })

  return { status: 'open', label: ranges.join(', '), weekdayText }
})
