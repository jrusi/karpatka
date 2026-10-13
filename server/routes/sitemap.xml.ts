import { defaultLocale, locales } from '../../i18n/locales'

// Every page of the site (paths without the language prefix). Add new pages here.
const pages = ['/', '/kamery']

function localizedUrl(siteUrl: string, code: string, page: string) {
  const prefix = code === defaultLocale ? '' : `/${code}`
  const path = page === '/' ? prefix : `${prefix}${page}`
  return `${siteUrl}${path}`
}

// One <url> per page and language, each listing all language versions
// (same as the hreflang links in the page <head>).
export default defineEventHandler((event) => {
  const { public: { siteUrl } } = useRuntimeConfig()

  const urls = pages.flatMap(page => locales.map((locale) => {
    const alternates = [
      ...locales.map(l => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${localizedUrl(siteUrl, l.code, page)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(siteUrl, defaultLocale, page)}"/>`,
    ]
    return `  <url>\n    <loc>${localizedUrl(siteUrl, locale.code, page)}</loc>\n${alternates.join('\n')}\n  </url>`
  }))

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
})
