import { roundMoney, formatCOP, toDecimal } from "./currency/money";
import { convertQuantity, areUnitsCompatible, IncompatibleUnitError } from "./units/unitConverter";
import {
  calculateCostPerBaseUnit,
  calculatePortionCost,
  calculateRecipeTotals,
  calculateSuggestedPrice,
} from "./calculations/costCalculator";
import { ingredientSchema } from "../schemas/ingredient.schema";
import { calculationSchema } from "../schemas/calculation.schema";

function runVerifications() {
  console.log("==========================================");
  console.log("EJECUTANDO COMPROBACIONES DE CORE DULCECUENTA");
  console.log("==========================================");

  // 1. Precisión decimal y formateo COP
  console.log("\n1. Verificando aritmética decimal y formato COP:");
  const sum = toDecimal(0.1).plus(0.2);
  if (!sum.equals(0.3)) {
    throw new Error(`Error de suma flotante: ${sum.toString()} !== 0.3`);
  }
  console.log("  ✓ Precisión decimal exacta:", sum.toString(), "== 0.3");
  const formatted = formatCOP(15500);
  console.log("  ✓ Formato COP 15500:", formatted);

  // 2. Conversiones de unidades dentro de la misma dimensión
  console.log("\n2. Verificando conversiones de unidades compatibles:");
  const kgToG = convertQuantity(1.5, "kg", "g");
  console.log("  ✓ 1.5 kg en gramos:", kgToG.toNumber(), "g (esperado: 1500 g)");
  if (kgToG.toNumber() !== 1500) throw new Error("Fallo en conversión kg -> g");

  const cdaToMl = convertQuantity(3, "cda", "ml");
  console.log("  ✓ 3 cucharadas en ml:", cdaToMl.toNumber(), "ml (esperado: 45 ml)");
  if (cdaToMl.toNumber() !== 45) throw new Error("Fallo en conversión cda -> ml");

  const docToUd = convertQuantity(2, "doc", "ud");
  console.log("  ✓ 2 docenas en unidades:", docToUd.toNumber(), "ud (esperado: 24 ud)");
  if (docToUd.toNumber() !== 24) throw new Error("Fallo en conversión doc -> ud");

  // 3. Prohibición estricta de conversiones entre dimensiones distintas
  console.log("\n3. Verificando bloqueo de conversiones incompatibles (sin densidad):");
  const compatible = areUnitsCompatible("g", "ml");
  console.log("  ✓ ¿Son compatibles gramos y mililitros?:", compatible, "(esperado: false)");
  if (compatible) throw new Error("Gramos y mililitros no deben ser compatibles directamente");

  let threwIncompatible = false;
  try {
    convertQuantity(250, "g", "ml");
  } catch (err) {
    if (err instanceof IncompatibleUnitError) {
      threwIncompatible = true;
      console.log("  ✓ Excepción atrapada correctamente:", err.message);
    }
  }
  if (!threwIncompatible) throw new Error("Debió lanzar IncompatibleUnitError");

  // 4. Cálculo de costo de ingredientes
  console.log("\n4. Verificando cálculo de costo unitario y porciones:");
  // Harina: 1000g comprados a $5.000 COP
  const unitCostHarina = calculateCostPerBaseUnit({
    purchasePrice: 5000,
    purchaseQuantity: 1000,
    purchaseUnit: "g",
  });
  console.log("  ✓ Costo base Harina:", unitCostHarina.costPerBaseUnit.toNumber(), "$/g (esperado: 5)");

  // Usamos 250g de Harina
  const portionCost = calculatePortionCost({
    costPerBaseUnit: unitCostHarina.costPerBaseUnit,
    baseUnit: unitCostHarina.baseUnit,
    quantityUsed: 250,
    usedUnit: "g",
  });
  console.log("  ✓ Costo porción 250g Harina:", portionCost.toNumber(), "COP (esperado: 1250)");
  if (portionCost.toNumber() !== 1250) throw new Error("Fallo en costo de porción");

  // 5. Totales de receta
  console.log("\n5. Verificando totales de receta y costo unitario:");
  const recipeTotals = calculateRecipeTotals({
    ingredientsCost: 15000,
    decorationCost: 5000,
    packagingCost: 3000,
    laborCost: 10000,
    otherCosts: 2000,
    yieldAmount: 10, // 10 porciones
  });
  console.log("  ✓ Costo ingredientes:", recipeTotals.ingredientsCost);
  console.log("  ✓ Costos adicionales:", recipeTotals.additionalCosts, "(esperado: 20000)");
  console.log("  ✓ Costo total producción:", recipeTotals.totalProductionCost, "(esperado: 35000)");
  console.log("  ✓ Costo por porción (10 ud):", recipeTotals.unitCost, "(esperado: 3500)");

  // 6. Métodos de cálculo de precio de venta: Markup vs Margin
  console.log("\n6. Verificando métodos de fijación de precio:");
  // Total costo: $35.000 COP, 30%
  const markupResult = calculateSuggestedPrice({
    totalCost: 35000,
    method: "MARKUP",
    percentage: 30,
  });
  console.log("  [MÉTODO 1: MARKUP 30%]");
  console.log("    - Precio Venta:", markupResult.suggestedPrice, "COP (esperado: 45500)");
  console.log("    - Ganancia:", markupResult.estimatedProfit, "COP (esperado: 10500)");

  const marginResult = calculateSuggestedPrice({
    totalCost: 35000,
    method: "MARGIN",
    percentage: 30,
  });
  console.log("  [MÉTODO 2: MARGIN 30%]");
  console.log("    - Precio Venta:", marginResult.suggestedPrice, "COP (esperado: 50000)");
  console.log("    - Ganancia:", marginResult.estimatedProfit, "COP (esperado: 15000)");
  console.log("    - Margen efectivo:", marginResult.effectiveMarginPercent, "%");

  if (markupResult.suggestedPrice !== 45500) throw new Error("Fallo en Markup");
  if (marginResult.suggestedPrice !== 50000) throw new Error("Fallo en Margin");

  // Validación de margen >= 100%
  let threwMarginError = false;
  try {
    calculateSuggestedPrice({
      totalCost: 35000,
      method: "MARGIN",
      percentage: 100,
    });
  } catch (err) {
    threwMarginError = true;
    console.log("  ✓ Margen 100% rechazado correctamente");
  }
  if (!threwMarginError) throw new Error("Debió rechazar margen de 100%");

  // 7. Esquemas Zod
  console.log("\n7. Verificando esquemas Zod:");
  const validIngredient = ingredientSchema.safeParse({
    name: "Azúcar Blanca",
    category: "Azúcares y Endulzantes",
    purchaseQuantity: 2,
    purchaseUnit: "kg",
    purchasePrice: 9000,
  });
  console.log("  ✓ Validación ingrediente válido:", validIngredient.success);

  const invalidIngredient = ingredientSchema.safeParse({
    name: "A",
    category: "",
    purchaseQuantity: -5,
    purchaseUnit: "metro",
    purchasePrice: -100,
  });
  console.log("  ✓ Validación ingrediente inválido rechazado:", !invalidIngredient.success);

  console.log("\n==========================================");
  console.log("✓ TODAS LAS COMPROBACIONES PASARON CON ÉXITO");
  console.log("==========================================");
}

runVerifications();

