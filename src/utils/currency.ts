// Currency utility for Tanzanian Shillings (TSH)
export const formatTshPrice = (amount: number): string => {
  return new Intl.NumberFormat('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatTshAmount = (amount: number): string => {
  return formatTshPrice(amount);
};

// Keep conversion utilities for reference but make TSH primary
const USD_TO_TZS_RATE = 2500; // Approximate exchange rate (1 USD = 2500 TZS)

export const convertUsdToTzs = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_TZS_RATE);
};

// Legacy function names for backward compatibility
export const formatTzsPrice = formatTshPrice;
export const formatTzsAmount = formatTshAmount;
