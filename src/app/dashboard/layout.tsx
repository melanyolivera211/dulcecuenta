import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";

export const metadata = {
  title: "Panel Principal — DulceCuenta",
  description: "Administra ingredientes, recetas y costos de tu pastelería artesanal.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}

