const TAX_EXEMPTION = 0.66;

export function getAmountWithTaxExemption(amount) {
  return amount * (1 - TAX_EXEMPTION);
}

export function getAmountFormatted(amount, withFractionDigits) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: withFractionDigits ? 2 : 0,
  }).format(amount);
}
