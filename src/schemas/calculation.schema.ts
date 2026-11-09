import { z } from "zod";

export const calculationSchema = z
  .object({
    recipeId: z.string().optional().nullable(),
    productName: z
      .string()
      .trim()
      .min(2, "El nombre del producto debe tener al menos 2 caracteres"),
    yieldAmount: z.number().positive("El rendimiento debe ser mayor a 0").default(1),
    ingredientsCost: z.number().min(0, "El costo de ingredientes no puede ser negativo"),
    additionalCosts: z.number().min(0, "Los costos adicionales no pueden ser negativos"),
    method: z.enum(["MARKUP", "MARGIN"], {
      message: "Selecciona un método válido: MARKUP (recargo) o MARGIN (margen)",
    }),
    percentage: z.number().min(0, "El porcentaje no puede ser negativo"),
    breakdown: z.record(z.string(), z.any()).optional(),
  })
  .refine(
    (data) => {
      if (data.method === "MARGIN") {
        return data.percentage < 100;
      }
      return true;
    },
    {
      message: "El margen sobre el precio de venta debe ser menor al 100%",
      path: ["percentage"],
    }
  );

export type CalculationInput = z.infer<typeof calculationSchema>;
