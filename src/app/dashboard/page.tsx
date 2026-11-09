import React from "react";
import Link from "next/link";
import {
  Wheat,
  ChefHat,
  Calculator,
  History,
  Plus,
  ArrowRight,
  Sparkles,
  Cake,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
  // En esta Fase 3 (Diseño de interfaz), las métricas inician en 0 real (estado inicial del emprendedor)
  // No inventamos números ficticios.
  const metrics = {
    ingredientsCount: 0,
    recipesCount: 0,
    calculationsCount: 0,
  };

  return (
    <div className="space-y-8">
      {/* 1. Saludo de Bienvenida & Banner de Identidad */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-rose-pastel-100/80 via-cream-100 to-cream-50 p-6 md:p-8 border border-rose-pastel-200/80 shadow-2xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-rose-pastel-200 text-rose-pastel-600 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cartagena, Colombia • Repostería Artesanal</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brown-soft-900 tracking-tight">
              ¡Bienvenido a <span className="text-rose-pastel-500">DulceCuenta</span>!
            </h2>
            <p className="text-sm md:text-base text-brown-soft-600 leading-relaxed">
              Controla el costo real de cada torta y postre, calcula con exactitud tus insumos y establece
              precios de venta justos y rentables para hacer crecer tu emprendimiento.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <Link href="/dashboard/ingredientes">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-start shadow-xs"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Nuevo Ingrediente
              </Button>
            </Link>
            <Link href="/dashboard/calculadora">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-start"
                leftIcon={<Calculator className="w-4 h-4 text-rose-pastel-500" />}
              >
                Calcular Costo
              </Button>
            </Link>
          </div>
        </div>

        {/* Detalle decorativo de fondo */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none text-rose-pastel-500">
          <Cake className="w-64 h-64" />
        </div>
      </div>

      {/* 2. Tarjetas de Resumen (Métricas de negocio) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Métrica: Ingredientes */}
        <Card className="hover:border-beige-300 transition-all hover:shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-brown-soft-600">
                Insumos Registrados
              </span>
              <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center text-brown-soft-800">
                <Wheat className="w-5 h-5 text-rose-pastel-500" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-brown-soft-900">
                {metrics.ingredientsCount}
              </span>
              <span className="text-xs text-brown-soft-600 font-medium">ingredientes</span>
            </div>
            <div className="mt-4 pt-4 border-t border-cream-200/80 flex items-center justify-between text-xs">
              <span className="text-brown-soft-600">Catálogo de materias primas</span>
              <Link
                href="/dashboard/ingredientes"
                className="font-medium text-rose-pastel-500 hover:text-rose-pastel-600 inline-flex items-center gap-1 group"
              >
                Gestionar
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Métrica: Recetas */}
        <Card className="hover:border-beige-300 transition-all hover:shadow-xs">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-brown-soft-600">
                Recetas & Productos
              </span>
              <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center text-brown-soft-800">
                <ChefHat className="w-5 h-5 text-rose-pastel-500" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-brown-soft-900">
                {metrics.recipesCount}
              </span>
              <span className="text-xs text-brown-soft-600 font-medium">fichas técnicas</span>
            </div>
            <div className="mt-4 pt-4 border-t border-cream-200/80 flex items-center justify-between text-xs">
              <span className="text-brown-soft-600">Tortas, galletas y postres</span>
              <Link
                href="/dashboard/recetas"
                className="font-medium text-rose-pastel-500 hover:text-rose-pastel-600 inline-flex items-center gap-1 group"
              >
                Ver recetas
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Métrica: Cálculos / Cotizaciones */}
        <Card className="hover:border-beige-300 transition-all hover:shadow-xs sm:col-span-2 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider uppercase text-brown-soft-600">
                Cálculos Guardados
              </span>
              <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center text-brown-soft-800">
                <History className="w-5 h-5 text-rose-pastel-500" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-brown-soft-900">
                {metrics.calculationsCount}
              </span>
              <span className="text-xs text-brown-soft-600 font-medium">presupuestos</span>
            </div>
            <div className="mt-4 pt-4 border-t border-cream-200/80 flex items-center justify-between text-xs">
              <span className="text-brown-soft-600">Historial con snapshots</span>
              <Link
                href="/dashboard/historial"
                className="font-medium text-rose-pastel-500 hover:text-rose-pastel-600 inline-flex items-center gap-1 group"
              >
                Consultar
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Accesos Rápidos (Quick Actions) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-brown-soft-900 tracking-tight">
            ¿Qué deseas hacer hoy?
          </h3>
          <span className="text-xs text-brown-soft-600">Flujo paso a paso</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/ingredientes" className="group">
            <div className="p-5 rounded-2xl bg-white border border-beige-200 hover:border-rose-pastel-300 transition-all shadow-2xs hover:shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-rose-pastel-50 border border-rose-pastel-200 flex items-center justify-center text-rose-pastel-500 shrink-0 group-hover:scale-105 transition-transform">
                <Wheat className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-pastel-600">Paso 1</span>
                  <Badge variant="neutral">Insumos</Badge>
                </div>
                <h4 className="font-bold text-brown-soft-900 text-sm group-hover:text-rose-pastel-600 transition-colors">
                  Registrar Ingredientes
                </h4>
                <p className="text-xs text-brown-soft-600 leading-snug">
                  Ingresa precio y cantidad de compra para calcular el costo por gramo o mililitro.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/recetas" className="group">
            <div className="p-5 rounded-2xl bg-white border border-beige-200 hover:border-rose-pastel-300 transition-all shadow-2xs hover:shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-cream-200 border border-beige-300 flex items-center justify-center text-brown-soft-800 shrink-0 group-hover:scale-105 transition-transform">
                <ChefHat className="w-5 h-5 text-rose-pastel-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-pastel-600">Paso 2</span>
                  <Badge variant="neutral">Composición</Badge>
                </div>
                <h4 className="font-bold text-brown-soft-900 text-sm group-hover:text-rose-pastel-600 transition-colors">
                  Crear una Receta
                </h4>
                <p className="text-xs text-brown-soft-600 leading-snug">
                  Arma la ficha técnica sumando insumos, empaque, decoración y mano de obra.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/calculadora" className="group">
            <div className="p-5 rounded-2xl bg-white border border-beige-200 hover:border-rose-pastel-300 transition-all shadow-2xs hover:shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-cream-200 border border-beige-300 flex items-center justify-center text-brown-soft-800 shrink-0 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5 text-rose-pastel-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-pastel-600">Paso 3</span>
                  <Badge variant="neutral">Finanzas</Badge>
                </div>
                <h4 className="font-bold text-brown-soft-900 text-sm group-hover:text-rose-pastel-600 transition-colors">
                  Fijar Precio de Venta
                </h4>
                <p className="text-xs text-brown-soft-600 leading-snug">
                  Aplica margen sobre costo (Markup) o margen sobre precio de venta con precisión.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Sección de Actividad Reciente con Estado Vacío Elegante */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimos ingredientes registrados y recetas calculadas en tu taller.
              </CardDescription>
            </div>
            <Badge variant="neutral" className="gap-1">
              <Clock className="w-3 h-3" />
              <span>Tiempo real</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<Cake className="w-7 h-7 text-rose-pastel-500" />}
            title="Tu pastelería está lista para comenzar"
            description="Aún no has registrado ingredientes en tu cuenta. Empieza añadiendo tu primer insumo para activar las estadísticas y cálculos automáticos."
            action={
              <Link href="/dashboard/ingredientes">
                <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
                  Registrar Primer Ingrediente
                </Button>
              </Link>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

