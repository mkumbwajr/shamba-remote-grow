
// Currency conversion utility
const USD_TO_TZS_RATE = 2500; // Approximate exchange rate (1 USD = 2500 TZS)

export const convertUsdToTzs = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_TZS_RATE);
};

export const formatTzsPrice = (amount: number): string => {
  return new Intl.NumberFormat('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatTzsAmount = (usdAmount: number): string => {
  const tzsAmount = convertUsdToTzs(usdAmount);
  return formatTzsPrice(tzsAmount);
};
