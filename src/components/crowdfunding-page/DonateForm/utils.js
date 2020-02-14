export function getAmountFormatted(amount, withFractionDigits) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: withFractionDigits ? 2 : 0,
  }).format(amount);
}
