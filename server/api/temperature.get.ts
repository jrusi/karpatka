export default defineEventHandler(async () => {
  try {
    const html = await $fetch<string>('https://wyciag-karpacz.pl/current_temp_show.php')
    const match = html.match(/Temperatura:\s*(-?\d+(?:[.,]\d+)?)\s*°C/)
    const temperature = match ? parseFloat(match[1].replace(',', '.')) : null
    return { temperature }
  } catch {
    return { temperature: null }
  }
})
