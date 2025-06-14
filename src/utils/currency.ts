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

// Service charge and VAT configuration
const SERVICE_CHARGE_RATE = 0.10; // 10%
const VAT_RATE = 0.18; // 18% VAT (standard rate in Tanzania)

// Calculate service charge
export const calculateServiceCharge = (baseAmount: number): number => {
  return Math.round(baseAmount * SERVICE_CHARGE_RATE);
};

// Calculate VAT on amount including service charge
export const calculateVAT = (amountWithServiceCharge: number): number => {
  return Math.round(amountWithServiceCharge * VAT_RATE);
};

// Calculate total price with service charge and VAT
export const calculateTotalPrice = (baseAmount: number): number => {
  const serviceCharge = calculateServiceCharge(baseAmount);
  const amountWithServiceCharge = baseAmount + serviceCharge;
  const vat = calculateVAT(amountWithServiceCharge);
  return amountWithServiceCharge + vat;
};

// Get price breakdown
export const getPriceBreakdown = (baseAmount: number) => {
  const serviceCharge = calculateServiceCharge(baseAmount);
  const amountWithServiceCharge = baseAmount + serviceCharge;
  const vat = calculateVAT(amountWithServiceCharge);
  const total = amountWithServiceCharge + vat;
  
  return {
    baseAmount,
    serviceCharge,
    vat,
    total
  };
};

// Keep conversion utilities for reference but make TSH primary
const USD_TO_TZS_RATE = 2500; // Approximate exchange rate (1 USD = 2500 TZS)

export const convertUsdToTzs = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_TZS_RATE);
};

// Legacy function names for backward compatibility
export const formatTzsPrice = formatTshPrice;
export const formatTzsAmount = formatTshAmount;
