"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { X } from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-cream-50 text-brown-soft-800 antialiased">
      {/* Sidebar para pantallas de escritorio (Desktop / Tablet grande) */}
      <div className="hidden md:flex md:w-64 lg:w-72 md:shrink-0 md:fixed md:inset-y-0 z-40">
        <Sidebar className="w-full" />
      </div>

      {/* Drawer móvil para teléfonos y tablets pequeñas */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop con desenfoque suave */}
          <div
            className="fixed inset-0 bg-brown-soft-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Panel lateral deslizante */}
          <div className="relative flex flex-col w-72 max-w-xs bg-white shadow-2xl z-50 h-full animate-in slide-in-from-left duration-200">
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-cream-100 text-brown-soft-600 hover:text-brown-soft-900 cursor-pointer"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar onItemClick={() => setMobileMenuOpen(false)} className="w-full border-r-0" />
          </div>
        </div>
      )}

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col md:pl-64 lg:pl-72 min-w-0 min-h-screen">
        <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

