import React from "react";
import { Wheat, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function IngredientesPage() {
  return (
    <div className="space-y-6">
      {/* Barra de Acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brown-soft-900 tracking-tight">
            Catálogo de Ingredientes
          </h2>
          <p className="text-xs text-brown-soft-600 mt-0.5">
            Administra tus insumos, unidades de medida y precios de compra en COP.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            disabled
          >
            Nuevo Ingrediente (Fase 5)
          </Button>
        </div>
      </div>

      {/* Contenedor Principal con Estado Vacío Guiado */}
      <Card>
        <CardContent className="p-6 md:p-12">
          <EmptyState
            icon={<Wheat className="w-7 h-7 text-rose-pastel-500" />}
            title="Catálogo de Insumos Vacío"
            description="Aquí podrás crear, editar y consultar tus materias primas (harinas, chocolates, frutas, lácteos) con cálculo automático de costo por gramo, mililitro o unidad."
            action={
              <Badge variant="neutral" className="text-xs py-1 px-3">
                Módulo a conectar en la Fase 5: Gestión de Ingredientes
              </Badge>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

