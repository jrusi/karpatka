interface GooglePeriod {
  open: { day: number; time: string }
  close?: { day: number; time: string }
}

interface GooglePlaceDetailsResponse {
  result?: {
    business_status?: string
    opening_hours?: {
      periods?: GooglePeriod[]
      weekday_text?: string[]
    }
  }
  status?: string
  error_message?: string
}

export interface StoredBusinessHours {
  businessStatus: string
  periods: GooglePeriod[]
  weekdayText: string[]
  fetchedAt: string
}

const STORAGE_KEY = 'google'

function storage() {
  return useStorage('data')
}

/**
 * Calls the Google Places API (Place Details) and caches the result.
 * Mirrors the WordPress "Google Business Hours" plugin's daily cron fetch —
 * called once a day by server/tasks/fetch-opening-hours.ts.
 */
export async function fetchAndStoreOpeningHours(): Promise<StoredBusinessHours | null> {
  const config = useRuntimeConfig()
  const apiKey = config.googlePlacesApiKey
  const placeId = config.googlePlaceId

  if (!apiKey) {
    console.warn('[google-business-hours] NUXT_GOOGLE_PLACES_API_KEY is not set — skipping fetch')
    return null
  }

  const url = 'https://maps.googleapis.com/maps/api/place/details/json'

  const data = await $fetch<GooglePlaceDetailsResponse>(url, {
    query: {
      place_id: placeId,
      fields: 'opening_hours,business_status',
      key: apiKey,
      language: 'pl',
    },
  })

  if (data.status && data.status !== 'OK') {
    console.error('[google-business-hours] Places API error:', data.status, data.error_message)
    return null
  }

  const stored: StoredBusinessHours = {
    businessStatus: data.result?.business_status ?? '',
    periods: data.result?.opening_hours?.periods ?? [],
    weekdayText: data.result?.opening_hours?.weekday_text ?? [],
    fetchedAt: new Date().toISOString(),
  }

  await storage().setItem(STORAGE_KEY, stored)
  return stored
}

export async function getStoredOpeningHours(): Promise<StoredBusinessHours | null> {
  return (await storage().getItem<StoredBusinessHours>(STORAGE_KEY)) ?? null
}
