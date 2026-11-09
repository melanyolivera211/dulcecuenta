import { z } from "zod";

export const SUPPORTED_UNITS = [
  "g",
  "kg",
  "lb",
  "oz",
  "ml",
  "l",
  "cda",
  "cdta",
  "taza",
  "ud",
  "doc",
] as const;

export const ingredientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre del ingrediente debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  category: z
    .string()
    .trim()
    .min(2, "La categoría es requerida")
    .max(50, "La categoría no puede exceder 50 caracteres"),
  purchaseQuantity: z
    .number()
    .positive("La cantidad comprada debe ser estrictamente mayor a 0"),
  purchaseUnit: z.enum(SUPPORTED_UNITS, {
    message: "Selecciona una unidad de medida válida",
  }),
  purchasePrice: z
    .number()
    .min(0, "El precio de compra no puede ser negativo"),
});

export type IngredientInput = z.infer<typeof ingredientSchema>;
