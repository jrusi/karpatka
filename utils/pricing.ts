// Prices in PLN — the single source for every language. Row names live in
// i18n/locales/<code>.json (pricing.rows.<id>, school.rentalItems.<id>,
// school.lessonPeople.<people>); format with usePrice().
export const seasonYears = '2025/2026'

export const pricingRows = [
  { id: 'hour1', normal: 55, reduced: 50 },
  { id: 'hour2', normal: 70, reduced: 65 },
  { id: 'hour3', normal: 80, reduced: 75 },
  { id: 'hour4', normal: 90, reduced: 85 },
  { id: 'daily', normal: 100, reduced: 95 },
  { id: 'evening', normal: 70, reduced: 65 },
  { id: 'sled1h', normal: 25, reduced: 25, sled: true },
  { id: 'sled2h', normal: 40, reduced: 40, sled: true },
]

export const rentalRows = [
  { id: 'carving', day: 40, night: 30 },
  { id: 'snowboard', day: 40, night: 30 },
]

export const lessonRows = [
  { people: 1, price: 130 },
  { people: 2, price: 210 },
  { people: 3, price: 260 },
  { people: 4, price: 320 },
]

export const lessonExtraPerson = 60

export const cardDeposit = 10

export function pricingRow(id: string) {
  return pricingRows.find(row => row.id === id)!
}
