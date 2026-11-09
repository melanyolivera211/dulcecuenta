import React from "react";
import { History, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function HistorialPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brown-soft-900 tracking-tight">
            Historial de Cálculos & Cotizaciones
          </h2>
          <p className="text-xs text-brown-soft-600 mt-0.5">
            Registro histórico inmutable mediante snapshots de costos.
          </p>
        </div>

        <Badge variant="neutral" className="gap-1.5 py-1 px-3">
          <ShieldCheck className="w-3.5 h-3.5 text-rose-pastel-500" />
          <span>Inmutabilidad garantizada</span>
        </Badge>
      </div>

      <Card>
        <CardContent className="p-6 md:p-12">
          <EmptyState
            icon={<History className="w-7 h-7 text-rose-pastel-500" />}
            title="Aún no hay cálculos guardados"
            description="Cada vez que realices una cotización y decidas guardarla, quedará registrada con fecha, porcentaje y desglose exacto de insumos, protegida contra cambios futuros de precios."
            action={
              <Badge variant="neutral" className="text-xs py-1 px-3">
                Módulo a conectar en la Fase 8: Historial de Cálculos
              </Badge>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

