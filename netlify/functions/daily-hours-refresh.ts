import { schedule } from '@netlify/functions'

// Netlify's native cron mechanism — the Netlify equivalent of the Nitro
// scheduledTask used for self-hosted deploys (see nuxt.config.ts). Runs once
// a day and simply calls the already-secret-protected refresh endpoint, so
// all the actual fetch/parse/store logic stays in one place (server/utils).
//
// Deliberately NOT using Netlify's auto-injected `URL` env var — it isn't
// reliably populated for scheduled/background functions (no inbound request
// to derive it from). Set SITE_URL explicitly instead (Site settings →
// Environment variables), e.g. https://karpatka.netlify.app or your domain.
export const handler = schedule('5 0 * * *', async () => {
  const siteUrl = process.env.SITE_URL
  const secret = process.env.NUXT_REFRESH_SECRET

  const missing = [
    !siteUrl && 'SITE_URL',
    !secret && 'NUXT_REFRESH_SECRET',
  ].filter(Boolean)

  if (missing.length) {
    console.error(`[daily-hours-refresh] Missing env var(s): ${missing.join(', ')}`)
    return { statusCode: 500 }
  }

  const response = await fetch(`${siteUrl}/api/opening-hours/refresh`, {
    method: 'POST',
    headers: { 'X-Refresh-Secret': secret! },
  })

  const body = await response.text()
  console.log('[daily-hours-refresh]', response.status, body)

  return { statusCode: 200 }
})
