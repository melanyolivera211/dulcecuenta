import React from "react";
import { Calculator, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function CalculadoraPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brown-soft-900 tracking-tight">
            Calculadora de Costos & Precios
          </h2>
          <p className="text-xs text-brown-soft-600 mt-0.5">
            Simula márgenes comerciales con precisión decimal y pesos colombianos.
          </p>
        </div>

        <Badge variant="neutral" className="gap-1.5 py-1 px-3">
          <Sparkles className="w-3.5 h-3.5 text-rose-pastel-500" />
          <span>Markup vs Margen sobre venta</span>
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6 md:p-12">
          <EmptyState
            icon={<Calculator className="w-7 h-7 text-rose-pastel-500" />}
            title="Calculadora Financiera Preparada"
            description="En este módulo interactivo podrás cargar cualquier receta o realizar un cálculo libre, evaluando el costo total y comparando en tiempo real los dos métodos de fijación de precio."
            action={
              <Badge variant="neutral" className="text-xs py-1 px-3">
                Módulo a conectar en la Fase 7: Calculadora de Costos
              </Badge>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

