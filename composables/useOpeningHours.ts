interface TimeRange {
  open: string
  close: string | null
}

function formatTime(time: string): string {
  // "0900" -> "9", "0930" -> "9:30"
  const hours = parseInt(time.slice(0, 2), 10)
  const minutes = time.slice(2, 4)
  return minutes === '00' ? `${hours}` : `${hours}:${minutes}`
}

function formatClock(time: string): string {
  // "0900" -> "9:00"
  return `${parseInt(time.slice(0, 2), 10)}:${time.slice(2, 4)}`
}

// Monday first, like Google's weekday_text. Google day numbers: 0 = Sunday.
const WEEK = [1, 2, 3, 4, 5, 6, 0]

export async function useOpeningHours() {
  const { t, localeProperties } = useI18n()
  const { data } = await useFetch('/api/opening-hours')

  const status = computed(() => data.value?.status ?? 'unknown')

  // Short label for the hero board: "9–16:30", "Zamknięte", "—".
  const todayLabel = computed(() => {
    if (status.value === 'closed_temporarily' || status.value === 'closed_today') return t('hours.closed')
    if (status.value !== 'open') return '—'
    return (data.value!.today as TimeRange[])
      .map((r) => (r.close ? `${formatTime(r.open)}–${formatTime(r.close)}` : t('hours.allDay')))
      .join(', ')
  })

  // Full week for the footer: "poniedziałek: 9:00–16:30".
  const weekLines = computed(() => {
    const periods = data.value?.periods ?? []
    if (!periods.length) return []
    const dayName = new Intl.DateTimeFormat(localeProperties.value.language, { weekday: 'long', timeZone: 'UTC' })
    return WEEK.map((day) => {
      // 2024-01-01 was a Monday, so Jan 1–7 cover Monday–Sunday.
      const name = dayName.format(Date.UTC(2024, 0, day === 0 ? 7 : day))
      const ranges = periods
        .filter((p) => p.open?.day === day)
        .map((p) => (p.close ? `${formatClock(p.open.time)}–${formatClock(p.close.time)}` : t('hours.allDay')))
      return `${name}: ${ranges.length ? ranges.join(', ') : t('hours.closed')}`
    })
  })

  return { status, todayLabel, weekLines }
}
