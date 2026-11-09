import { z } from "zod";
import { SUPPORTED_UNITS } from "./ingredient.schema";

export const recipeIngredientItemSchema = z.object({
  ingredientId: z.string().min(1, "El ingrediente es obligatorio"),
  quantity: z
    .number()
    .positive("La cantidad usada debe ser mayor a 0"),
  unit: z.enum(SUPPORTED_UNITS, {
    message: "Selecciona una unidad de uso válida",
  }),
});

export const recipeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre de la receta debe tener al menos 2 caracteres")
    .max(120, "El nombre de la receta no puede exceder 120 caracteres"),
  description: z
    .string()
    .trim()
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional()
    .or(z.literal("")),
  yieldAmount: z
    .number()
    .positive("El rendimiento debe ser al menos 1 porción/unidad"),
  yieldUnit: z
    .string()
    .trim()
    .min(1, "La unidad de rendimiento es requerida (ej: porciones, unidades, tortas)")
    .default("porciones"),
  decorationCost: z
    .number()
    .min(0, "El costo de decoración no puede ser negativo")
    .default(0),
  packagingCost: z
    .number()
    .min(0, "El costo de empaque no puede ser negativo")
    .default(0),
  laborCost: z
    .number()
    .min(0, "El costo de mano de obra no puede ser negativo")
    .default(0),
  otherCosts: z
    .number()
    .min(0, "Otros costos no pueden ser negativos")
    .default(0),
  ingredients: z
    .array(recipeIngredientItemSchema)
    .min(1, "Debes agregar al menos un ingrediente a la receta"),
});

export type RecipeInput = z.infer<typeof recipeSchema>;
export type RecipeIngredientItemInput = z.infer<typeof recipeIngredientItemSchema>;
