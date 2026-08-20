import { schedule } from '@netlify/functions'

// Netlify's native cron mechanism — the Netlify equivalent of the Nitro
// scheduledTask used for self-hosted deploys (see nuxt.config.ts). Runs once
// a day and simply calls the already-secret-protected refresh endpoint, so
// all the actual fetch/parse/store logic stays in one place (server/utils).
export const handler = schedule('5 0 * * *', async () => {
  const siteUrl = process.env.URL
  const secret = process.env.NUXT_REFRESH_SECRET

  if (!siteUrl || !secret) {
    console.error('[daily-hours-refresh] Missing URL or NUXT_REFRESH_SECRET env var')
    return { statusCode: 500 }
  }

  const response = await fetch(`${siteUrl}/api/opening-hours/refresh`, {
    method: 'POST',
    headers: { 'X-Refresh-Secret': secret },
  })

  const body = await response.text()
  console.log('[daily-hours-refresh]', response.status, body)

  return { statusCode: 200 }
})
