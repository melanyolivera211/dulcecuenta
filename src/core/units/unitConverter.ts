import { Decimal, toDecimal } from "../currency/money";

export type UnitDimension = "MASS" | "VOLUME" | "COUNT";

export interface UnitDefinition {
  symbol: string;
  name: string;
  dimension: UnitDimension;
  baseUnit: string;
  factorToBase: number; // Cuántas unidades base contiene 1 de esta unidad (ej: 1 kg = 1000 g)
}

/**
 * Catálogo de unidades soportadas por DulceCuenta.
 * Cada dimensión tiene una unidad base canónica:
 * - Masa: gramo ("g")
 * - Volumen: mililitro ("ml")
 * - Conteo: unidad ("ud")
 */
export const UNIT_CATALOG: Record<string, UnitDefinition> = {
  // Masa (Base: g)
  g: { symbol: "g", name: "Gramo", dimension: "MASS", baseUnit: "g", factorToBase: 1 },
  kg: { symbol: "kg", name: "Kilogramo", dimension: "MASS", baseUnit: "g", factorToBase: 1000 },
  lb: { symbol: "lb", name: "Libra (500g)", dimension: "MASS", baseUnit: "g", factorToBase: 500 },
  oz: { symbol: "oz", name: "Onza", dimension: "MASS", baseUnit: "g", factorToBase: 28.3495 },

  // Volumen (Base: ml)
  ml: { symbol: "ml", name: "Mililitro", dimension: "VOLUME", baseUnit: "ml", factorToBase: 1 },
  l: { symbol: "l", name: "Litro", dimension: "VOLUME", baseUnit: "ml", factorToBase: 1000 },
  cda: { symbol: "cda", name: "Cucharada (15ml)", dimension: "VOLUME", baseUnit: "ml", factorToBase: 15 },
  cdta: { symbol: "cdta", name: "Cucharadita (5ml)", dimension: "VOLUME", baseUnit: "ml", factorToBase: 5 },
  taza: { symbol: "taza", name: "Taza repostera (240ml)", dimension: "VOLUME", baseUnit: "ml", factorToBase: 240 },

  // Conteo (Base: ud)
  ud: { symbol: "ud", name: "Unidad", dimension: "COUNT", baseUnit: "ud", factorToBase: 1 },
  doc: { symbol: "doc", name: "Docena (12 ud)", dimension: "COUNT", baseUnit: "ud", factorToBase: 12 },
};

export class IncompatibleUnitError extends Error {
  constructor(public fromUnit: string, public toUnit: string) {
    super(
      `No se puede convertir entre unidades de dimensiones distintas: "${fromUnit}" y "${toUnit}". Las conversiones requieren ser de la misma naturaleza (ej: masa a masa o volumen a volumen).`
    );
    this.name = "IncompatibleUnitError";
  }
}

/**
 * Verifica si dos unidades pertenecen a la misma dimensión física.
 */
export function areUnitsCompatible(unitA: string, unitB: string): boolean {
  const defA = UNIT_CATALOG[unitA.toLowerCase()];
  const defB = UNIT_CATALOG[unitB.toLowerCase()];
  if (!defA || !defB) return false;
  return defA.dimension === defB.dimension;
}

/**
 * Convierte una cantidad de una unidad a otra dentro de la misma dimensión física.
 * Utiliza Decimal.js para evitar pérdida de precisión por redondeo en coma flotante.
 */
export function convertQuantity(
  amount: number | string | Decimal,
  fromUnit: string,
  toUnit: string
): Decimal {
  const cleanFrom = fromUnit.toLowerCase().trim();
  const cleanTo = toUnit.toLowerCase().trim();

  if (cleanFrom === cleanTo) {
    return toDecimal(amount);
  }

  const defFrom = UNIT_CATALOG[cleanFrom];
  const defTo = UNIT_CATALOG[cleanTo];

  if (!defFrom || !defTo) {
    throw new Error(`Unidad no reconocida: ${!defFrom ? cleanFrom : cleanTo}`);
  }

  if (defFrom.dimension !== defTo.dimension) {
    throw new IncompatibleUnitError(cleanFrom, cleanTo);
  }

  const decAmount = toDecimal(amount);
  const factorFrom = new Decimal(defFrom.factorToBase);
  const factorTo = new Decimal(defTo.factorToBase);

  // Convertimos a base: cantidad * factorFrom
  const inBase = decAmount.times(factorFrom);
  // Convertimos de base a destino: inBase / factorTo
  return inBase.dividedBy(factorTo);
}

