import { schedule } from '@netlify/functions'

// Netlify's native cron mechanism — the Netlify equivalent of the Nitro
// scheduledTask used for self-hosted deploys (see nuxt.config.ts). Runs once
// a day and simply calls the already-secret-protected refresh endpoint, so
// all the actual fetch/parse/store logic stays in one place (server/utils).
//
// Deliberately NOT using Netlify's auto-injected `URL` env var — it isn't
// reliably populated for scheduled/background functions (no inbound request
// to derive it from). Set SITE_URL explicitly instead (Site settings →
// Environment variables), e.g. https://www.wyciag-karpacz.pl.
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

  const target = `${siteUrl!.trim().replace(/\/+$/, '')}/api/opening-hours/refresh`

  try {
    const response = await fetch(target, {
      method: 'POST',
      headers: { 'X-Refresh-Secret': secret! },
    })

    const body = await response.text()
    console.log('[daily-hours-refresh]', target, response.status, body)
  } catch (error) {
    // A bare "fetch failed" hides the reason (DNS, TLS, refused connection) in
    // error.cause, and without the URL it's unclear whether SITE_URL is wrong.
    const cause = (error as { cause?: unknown }).cause
    console.error('[daily-hours-refresh] Request to', target, 'failed:', cause ?? error)
    return { statusCode: 500 }
  }

  return { statusCode: 200 }
})
