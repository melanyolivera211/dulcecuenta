import React from "react";
import { ChefHat, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function RecetasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brown-soft-900 tracking-tight">
            Fichas Técnicas & Recetas
          </h2>
          <p className="text-xs text-brown-soft-600 mt-0.5">
            Composición detallada de tus tortas, bizcochos y productos reposteros.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            disabled
          >
            Nueva Receta (Fase 6)
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 md:p-12">
          <EmptyState
            icon={<ChefHat className="w-7 h-7 text-rose-pastel-500" />}
            title="Sin Recetas Registradas"
            description="Aquí diseñarás tus recetas combinando múltiples ingredientes, especificando cantidades y sumando costos de decoración, empaque y mano de obra."
            action={
              <Badge variant="neutral" className="text-xs py-1 px-3">
                Módulo a conectar en la Fase 6: Gestión de Recetas
              </Badge>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

