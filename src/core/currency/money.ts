import Decimal from "decimal.js";

// Configuración de precisión decimal global para cálculos financieros
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

export { Decimal };

/**
 * Convierte un número o string a Decimal de forma segura.
 */
export function toDecimal(value: number | string | Decimal): Decimal {
  if (value instanceof Decimal) return value;
  if (typeof value === "number" && isNaN(value)) return new Decimal(0);
  try {
    return new Decimal(value || 0);
  } catch {
    return new Decimal(0);
  }
}

/**
 * Redondea un valor monetario a la cantidad deseada de decimales (por defecto 2).
 */
export function roundMoney(value: number | string | Decimal, decimals: number = 2): number {
  return toDecimal(value).toDecimalPlaces(decimals, Decimal.ROUND_HALF_UP).toNumber();
}

/**
 * Formatea un valor numérico como Moneda Colombiana (COP).
 * Ejemplo: 15500 -> "$ 15.500" o "$ 15.500,50" si tiene centavos.
 */
export function formatCOP(value: number | string | Decimal): string {
  const dec = toDecimal(value);
  const num = dec.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

