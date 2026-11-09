"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Cake,
  LayoutDashboard,
  Wheat,
  ChefHat,
  Calculator,
  History,
  Settings,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { name: "Panel Principal", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "Ingredientes", href: "/dashboard/ingredientes", icon: Wheat },
  { name: "Mis Recetas", href: "/dashboard/recetas", icon: ChefHat },
  { name: "Calculadora de Costos", href: "/dashboard/calculadora", icon: Calculator },
  { name: "Historial de Cálculos", href: "/dashboard/historial", icon: History },
  { name: "Configuración", href: "/dashboard/configuracion", icon: Settings },
];

interface SidebarProps {
  onItemClick?: () => void;
  className?: string;
}

export function Sidebar({ onItemClick, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-white border-r border-beige-200 select-none w-64 md:w-72 shadow-2xs",
        className
      )}
    >
      {/* Logotipo DulceCuenta */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-cream-200/80">
        <div className="w-10 h-10 rounded-xl bg-rose-pastel-100 border border-rose-pastel-200 flex items-center justify-center text-rose-pastel-500 shadow-2xs">
          <Cake className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg text-brown-soft-900 tracking-tight leading-none">
            Dulce<span className="text-rose-pastel-500">Cuenta</span>
          </span>
          <span className="text-[11px] text-brown-soft-600 font-medium mt-0.5">
            Costos & Repostería
          </span>
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-brown-soft-400">
          Menú Principal
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                "group flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-rose-pastel-100/90 text-rose-pastel-600 font-semibold shadow-2xs"
                  : "text-brown-soft-700 hover:bg-cream-100 hover:text-brown-soft-900"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200 group-hover:scale-105",
                  isActive ? "text-rose-pastel-500" : "text-brown-soft-400 group-hover:text-brown-soft-600"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Tarjeta de soporte / contexto del mercado */}
      <div className="p-4 border-t border-cream-200/80">
        <div className="p-3.5 rounded-xl bg-cream-100 border border-beige-300 text-xs text-brown-soft-700 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-brown-soft-900">
            <Sparkles className="w-3.5 h-3.5 text-rose-pastel-500" />
            <span>Cartagena, Colombia</span>
          </div>
          <p className="text-[11px] text-brown-soft-600 leading-snug">
            Cálculos en Pesos Colombianos (COP) para emprendedores y pastelerías artesanales.
          </p>
        </div>
      </div>
    </aside>
  );
}

