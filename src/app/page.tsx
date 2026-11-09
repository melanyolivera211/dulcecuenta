"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cake,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  Calculator,
  LayoutDashboard,
  Wheat,
  ChefHat,
  History,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { Modal } from "@/components/ui/modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10 max-w-6xl mx-auto w-full space-y-12">
      {/* 1. Hero Section */}
      <div className="flex flex-col items-center text-center space-y-4 pt-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-pastel-100 flex items-center justify-center text-rose-pastel-500 shadow-sm border border-rose-pastel-200">
          <Cake className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 border border-beige-300 text-brown-soft-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-rose-pastel-500" />
          <span>Fase 3: Interfaz de Usuario & Sistema de Componentes</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-brown-soft-900">
          Dulce<span className="text-rose-pastel-500">Cuenta</span>
        </h1>
        <p className="text-base md:text-lg text-brown-soft-600 max-w-2xl leading-relaxed">
          Diseñado para pequeños negocios y reposteros independientes en Cartagena, Colombia.
          Calcula costos reales con precisión decimal y define precios rentables.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explorar el Panel Principal
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setIsModalOpen(true)}
          >
            Probar Modal del Sistema
          </Button>
        </div>
      </div>

      {/* 2. Galería de Componentes Reutilizables Construidos */}
      <div className="w-full space-y-6">
        <div className="border-b border-beige-300 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-brown-soft-900">
              Catálogo de Componentes de la Interfaz
            </h2>
            <p className="text-xs text-brown-soft-600">
              Tokens de diseño: Crema, Beige, Rosa Pastel, Marrón Suave y Blanco.
            </p>
          </div>
          <Badge variant="default">100% Modulares</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Muestra: Botones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Botones & Acciones</CardTitle>
              <CardDescription>Variantes de color, tamaños y estados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="primary" size="sm">Primario</Button>
                <Button variant="secondary" size="sm">Secundario</Button>
                <Button variant="outline" size="sm">Borde</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <Button variant="primary" size="sm" isLoading>Guardando</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Muestra: Entradas & Formularios */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Campos de Formulario</CardTitle>
              <CardDescription>Inputs con addons monetarios y selectores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                label="Precio de compra"
                leftAddon="$ COP"
                defaultValue="5.000"
                placeholder="0"
              />
              <Select
                label="Unidad de medida"
                options={[
                  { value: "g", label: "Gramos (g)" },
                  { value: "kg", label: "Kilogramos (kg)" },
                  { value: "ml", label: "Mililitros (ml)" },
                  { value: "ud", label: "Unidades (ud)" },
                ]}
              />
            </CardContent>
          </Card>

          {/* Muestra: Badges & Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Badges & Alertas</CardTitle>
              <CardDescription>Estados informativos y de validación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="default">Rosa Pastel</Badge>
                <Badge variant="success">Rentable</Badge>
                <Badge variant="warning">Atención</Badge>
                <Badge variant="neutral">Insumo</Badge>
              </div>
              <Alert variant="info" title="Aviso Financiero">
                Los cálculos se realizan con precisión Decimal.js en Pesos Colombianos.
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Modal Interactivo de Demostración */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ventana Modal de DulceCuenta"
        description="Componente accesible con teclado (Escape) y fondo desenfocado."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cerrar
            </Button>
            <Link href="/dashboard">
              <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                Ir al Dashboard
              </Button>
            </Link>
          </>
        }
      >
        <div className="space-y-3 text-sm text-brown-soft-700 leading-relaxed">
          <p>
            Este modal está listo para ser utilizado en las confirmaciones de eliminación de ingredientes,
            en los diálogos de edición de recetas y en el visor detallado de cálculos históricos.
          </p>
          <div className="p-3 rounded-xl bg-cream-100 border border-beige-300 text-xs">
            ✨ Conserva el diseño cálido artesanal sin parecer una plantilla genérica.
          </div>
        </div>
      </Modal>
    </main>
  );
}
