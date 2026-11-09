import { Decimal, toDecimal, roundMoney } from "../currency/money";
import { convertQuantity, UNIT_CATALOG } from "../units/unitConverter";

export type CalculationMethod = "MARKUP" | "MARGIN";

export interface IngredientCostInput {
  purchasePrice: number | string | Decimal;
  purchaseQuantity: number | string | Decimal;
  purchaseUnit: string;
}

export interface PortionCostInput {
  costPerBaseUnit: number | string | Decimal;
  baseUnit: string;
  quantityUsed: number | string | Decimal;
  usedUnit: string;
}

export interface RecipeCostsInput {
  ingredientsCost: number | string | Decimal;
  decorationCost?: number | string | Decimal;
  packagingCost?: number | string | Decimal;
  laborCost?: number | string | Decimal;
  otherCosts?: number | string | Decimal;
  yieldAmount?: number | string | Decimal;
}

export interface PriceEstimationInput {
  totalCost: number | string | Decimal;
  method: CalculationMethod;
  percentage: number | string | Decimal;
}

export interface PriceEstimationResult {
  method: CalculationMethod;
  percentage: number;
  totalCost: number;
  suggestedPrice: number;
  estimatedProfit: number;
  effectiveMarginPercent: number; // Margen real sobre precio de venta
  effectiveMarkupPercent: number; // Recargo real sobre costo
}

/**
 * Calcula el costo por unidad base (ej: $/g, $/ml, $/ud) a partir del precio de compra.
 */
export function calculateCostPerBaseUnit(input: IngredientCostInput): {
  costPerBaseUnit: Decimal;
  baseUnit: string;
} {
  const price = toDecimal(input.purchasePrice);
  const qty = toDecimal(input.purchaseQuantity);
  const unitDef = UNIT_CATALOG[input.purchaseUnit.toLowerCase()];

  if (!unitDef) {
    throw new Error(`Unidad desconocida: ${input.purchaseUnit}`);
  }

  if (qty.isZero() || qty.isNegative()) {
    throw new Error("La cantidad de compra debe ser estrictamente mayor a 0");
  }

  if (price.isNegative()) {
    throw new Error("El precio de compra no puede ser negativo");
  }

  // Convertimos la cantidad de compra a su unidad base
  const qtyInBase = qty.times(unitDef.factorToBase);
  const costPerBaseUnit = price.dividedBy(qtyInBase);

  return {
    costPerBaseUnit,
    baseUnit: unitDef.baseUnit,
  };
}

/**
 * Calcula el costo de la porción utilizada de un ingrediente dentro de una receta.
 */
export function calculatePortionCost(input: PortionCostInput): Decimal {
  const costPerBase = toDecimal(input.costPerBaseUnit);
  const qtyUsed = toDecimal(input.quantityUsed);

  if (qtyUsed.isNegative()) {
    throw new Error("La cantidad utilizada no puede ser negativa");
  }

  // Convertimos la cantidad usada a la unidad base del ingrediente
  const qtyInBase = convertQuantity(qtyUsed, input.usedUnit, input.baseUnit);
  return qtyInBase.times(costPerBase);
}

/**
 * Calcula los totales de una receta: ingredientes + costos adicionales + costo unitario.
 */
export function calculateRecipeTotals(input: RecipeCostsInput) {
  const ingredients = toDecimal(input.ingredientsCost);
  const decoration = toDecimal(input.decorationCost || 0);
  const packaging = toDecimal(input.packagingCost || 0);
  const labor = toDecimal(input.laborCost || 0);
  const other = toDecimal(input.otherCosts || 0);
  const yields = toDecimal(input.yieldAmount || 1);

  const additionalCosts = decoration.plus(packaging).plus(labor).plus(other);
  const totalProductionCost = ingredients.plus(additionalCosts);

  const safeYield = yields.greaterThan(0) ? yields : new Decimal(1);
  const unitCost = totalProductionCost.dividedBy(safeYield);

  return {
    ingredientsCost: roundMoney(ingredients),
    additionalCosts: roundMoney(additionalCosts),
    totalProductionCost: roundMoney(totalProductionCost),
    unitCost: roundMoney(unitCost),
    rawTotalProductionCost: totalProductionCost,
    rawUnitCost: unitCost,
  };
}

/**
 * Calcula el precio de venta sugerido y la ganancia según el método seleccionado.
 *
 * Método 1: Margen sobre Costo (Markup / Recargo)
 *   Precio = Costo × (1 + % / 100)
 *
 * Método 2: Margen sobre Precio de Venta (Margin)
 *   Precio = Costo / (1 - % / 100)   [Validar: 0 <= % < 100]
 */
export function calculateSuggestedPrice(input: PriceEstimationInput): PriceEstimationResult {
  const totalCost = toDecimal(input.totalCost);
  const percent = toDecimal(input.percentage);

  if (totalCost.isNegative()) {
    throw new Error("El costo total no puede ser negativo");
  }

  if (percent.isNegative()) {
    throw new Error("El porcentaje no puede ser negativo");
  }

  let suggestedPrice: Decimal;
  let effectiveMarginPercent: Decimal;
  let effectiveMarkupPercent: Decimal;

  if (input.method === "MARKUP") {
    // Método 1: Recargo sobre costo
    const factor = new Decimal(1).plus(percent.dividedBy(100));
    suggestedPrice = totalCost.times(factor);

    effectiveMarkupPercent = percent;
    effectiveMarginPercent = suggestedPrice.isZero()
      ? new Decimal(0)
      : suggestedPrice.minus(totalCost).dividedBy(suggestedPrice).times(100);
  } else if (input.method === "MARGIN") {
    // Método 2: Margen sobre precio de venta
    if (percent.greaterThanOrEqualTo(100)) {
      throw new Error(
        "El porcentaje de margen sobre el precio de venta debe ser estrictamente menor al 100%"
      );
    }
    const divisor = new Decimal(1).minus(percent.dividedBy(100));
    suggestedPrice = totalCost.dividedBy(divisor);

    effectiveMarginPercent = percent;
    effectiveMarkupPercent = totalCost.isZero()
      ? new Decimal(0)
      : suggestedPrice.minus(totalCost).dividedBy(totalCost).times(100);
  } else {
    throw new Error(`Método de cálculo inválido: ${input.method}`);
  }

  const estimatedProfit = suggestedPrice.minus(totalCost);

  return {
    method: input.method,
    percentage: roundMoney(percent, 2),
    totalCost: roundMoney(totalCost, 2),
    suggestedPrice: roundMoney(suggestedPrice, 2),
    estimatedProfit: roundMoney(estimatedProfit, 2),
    effectiveMarginPercent: roundMoney(effectiveMarginPercent, 2),
    effectiveMarkupPercent: roundMoney(effectiveMarkupPercent, 2),
  };
}

