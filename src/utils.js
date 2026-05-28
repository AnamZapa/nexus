/**
 * Formats a number to Colombian Pesos (COP) currency string.
 * @param {number} value - The numeric value to format.
 * @returns {string} Formatted string, e.g., "$4.500.000 COP"
 */
export function formatCOP(value) {
  if (value === undefined || value === null) return '0 COP';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value) + ' COP';
}
