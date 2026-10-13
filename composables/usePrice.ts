// Formats a PLN amount in the current language ("55 zł", later "55 PLN").
export function usePrice() {
  const { t } = useI18n()
  return {
    price: (n: number) => t('common.price', { n }),
    pricePerHour: (n: number) => t('common.pricePerHour', { n }),
  }
}
