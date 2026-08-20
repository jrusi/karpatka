// Manual trigger for testing — runs the same fetch the daily cron task runs.
// Requires the shared secret (NUXT_REFRESH_SECRET) via the X-Refresh-Secret
// header, e.g.: curl -X POST -H "X-Refresh-Secret: <secret>" /api/opening-hours/refresh
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const expected = config.refreshSecret
  const provided = getHeader(event, 'x-refresh-secret')

  if (!expected || provided !== expected) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const result = await fetchAndStoreOpeningHours()
  return { ok: !!result, result }
})
