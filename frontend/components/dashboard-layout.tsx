"use client";

import type { ReactNode } from "react";
interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex-1 overflow-auto">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Dashboard de conversas</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
