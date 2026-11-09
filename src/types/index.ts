export * from "../core/units/unitConverter";
export * from "../core/currency/money";
export * from "../core/calculations/costCalculator";
export * from "../schemas/auth.schema";
export * from "../schemas/ingredient.schema";
export * from "../schemas/recipe.schema";
export * from "../schemas/calculation.schema";

export type IngredientCategory =
  | "Harinas y Féculas"
  | "Azúcares y Endulzantes"
  | "Chocolates y Cacaos"
  | "Lácteos y Derivados"
  | "Grasas y Aceites"
  | "Huevos"
  | "Frutas y Frutos Secos"
  | "Esencias y Colorantes"
  | "Levaduras y Polvos"
  | "Empaques y Decoración"
  | "Otros";

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  "Harinas y Féculas",
  "Azúcares y Endulzantes",
  "Chocolates y Cacaos",
  "Lácteos y Derivados",
  "Grasas y Aceites",
  "Huevos",
  "Frutas y Frutos Secos",
  "Esencias y Colorantes",
  "Levaduras y Polvos",
  "Empaques y Decoración",
  "Otros",
];

