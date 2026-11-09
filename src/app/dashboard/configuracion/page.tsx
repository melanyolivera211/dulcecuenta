import React from "react";
import { Settings, Store, ShieldCheck, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-brown-soft-900 tracking-tight">
          Configuración del Negocio
        </h2>
        <p className="text-xs text-brown-soft-600 mt-0.5">
          Preferencias operativas y datos de tu taller repostero.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-pastel-100 flex items-center justify-center text-rose-pastel-500">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base">Datos del Taller</CardTitle>
                <CardDescription>Información del emprendimiento</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-cream-200/80">
              <span className="text-brown-soft-600 text-xs">Nombre:</span>
              <span className="font-semibold text-brown-soft-900">Pastelería Artesanal</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-cream-200/80">
              <span className="text-brown-soft-600 text-xs">Ciudad / Mercado:</span>
              <span className="font-semibold text-brown-soft-900 inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-pastel-500" /> Cartagena, Colombia
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-brown-soft-600 text-xs">Moneda principal:</span>
              <Badge variant="default">COP (Pesos Colombianos)</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cream-200 flex items-center justify-center text-brown-soft-800">
                <ShieldCheck className="w-5 h-5 text-rose-pastel-500" />
              </div>
              <div>
                <CardTitle className="text-base">Seguridad & Aislamiento</CardTitle>
                <CardDescription>Privacidad de los datos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-brown-soft-600 leading-relaxed">
            <p>
              Tus ingredientes, recetas y presupuestos están completamente aislados y encriptados en el servidor.
            </p>
            <div className="p-3 rounded-xl bg-cream-100 border border-beige-300 font-medium text-brown-soft-800">
              ✓ Filtro criptográfico por usuario activo en cada consulta.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

