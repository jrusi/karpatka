export default defineTask({
  meta: {
    name: 'fetch-opening-hours',
    description: 'Fetch business opening hours from the Google Places API once a day',
  },
  async run() {
    const result = await fetchAndStoreOpeningHours()
    return { result: result ? 'success' : 'skipped' }
  },
})
