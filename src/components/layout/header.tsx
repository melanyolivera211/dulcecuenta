"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, User, Sparkles, Bell } from "lucide-react";
import { Badge } from "../ui/badge";

const sectionTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Panel Principal",
    subtitle: "Resumen y métricas de tu pastelería artesanal",
  },
  "/dashboard/ingredientes": {
    title: "Gestión de Ingredientes",
    subtitle: "Catálogo de insumos, costos de compra y unidades base",
  },
  "/dashboard/recetas": {
    title: "Mis Recetas & Productos",
    subtitle: "Fichas técnicas de elaboración y rendimiento",
  },
  "/dashboard/calculadora": {
    title: "Calculadora de Costos & Precios",
    subtitle: "Estimación financiera precisa (Markup vs Margen sobre venta)",
  },
  "/dashboard/historial": {
    title: "Historial de Cálculos",
    subtitle: "Presupuestos y cotizaciones con snapshots inmutables",
  },
  "/dashboard/configuracion": {
    title: "Configuración del Taller",
    subtitle: "Preferencias de tu cuenta, moneda y datos del negocio",
  },
};

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();
  const currentSection = sectionTitles[pathname] || {
    title: "DulceCuenta",
    subtitle: "Gestión de costos reposteros",
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-beige-200 bg-white/95 px-4 md:px-8 backdrop-blur-xs transition-all">
      {/* Botón Móvil y Título de la Sección */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-beige-300 bg-cream-100 text-brown-soft-800 hover:bg-cream-200 transition-colors cursor-pointer"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-brown-soft-900 leading-tight">
            {currentSection.title}
          </h1>
          <p className="hidden sm:block text-xs text-brown-soft-600 mt-0.5">
            {currentSection.subtitle}
          </p>
        </div>
      </div>

      {/* Perfil del Usuario & Acciones */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Badge de Moneda */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200/70 border border-beige-300 text-brown-soft-700 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-rose-pastel-500" />
          <span>COP ($)</span>
        </div>

        {/* Indicador de Notificaciones */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-beige-200 hover:bg-cream-100 text-brown-soft-600 transition-colors cursor-pointer"
          aria-label="Ver notificaciones"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Avatar y Datos del Negocio */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-cream-300/80">
          <div className="w-9 h-9 rounded-xl bg-rose-pastel-100 border border-rose-pastel-300 flex items-center justify-center text-rose-pastel-600 font-bold text-xs shadow-2xs">
            DC
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-brown-soft-900 leading-tight">
              Pastelería Artesanal
            </span>
            <span className="text-[10px] text-brown-soft-600">
              Cartagena, Colombia
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

