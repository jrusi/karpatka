// Returns language-neutral data only (status codes and raw "HHMM" times); the
// texts are built per language in composables/useOpeningHours.ts, so the
// once-a-day Google fetch serves every language.
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function todayInPoland(): number {
  // Google's period.open.day: 0 = Sunday ... 6 = Saturday. The server runs in
  // UTC, so take the weekday in Polish time, not Date#getDay().
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Warsaw', weekday: 'short' }).format(new Date())
  return WEEKDAYS.indexOf(weekday)
}

export default defineEventHandler(async () => {
  const stored = await getStoredOpeningHours()

  if (!stored) {
    return { status: 'unknown', today: [], periods: [] }
  }

  const periods = stored.periods

  if (stored.businessStatus === 'CLOSED_TEMPORARILY') {
    return { status: 'closed_temporarily', today: [], periods }
  }

  const today = periods
    .filter((p) => p.open?.day === todayInPoland())
    .map((p) => ({ open: p.open.time, close: p.close?.time ?? null }))

  return { status: today.length ? 'open' : 'closed_today', today, periods }
})
