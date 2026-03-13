"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, DollarSign, ArrowLeft } from "lucide-react";
import Logo from "@/components/ui/Logo";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Usuarios", icon: Users },
  { href: "/admin/revenue", label: "Faturamento", icon: DollarSign },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 min-h-screen border-r flex flex-col py-6 px-4 flex-shrink-0"
      style={{ background: "#0A0A0A", borderColor: "#1A1A1A" }}
    >
      <div className="mb-8">
        <Logo size="sm" />
        <span
          className="text-[10px] font-bold uppercase tracking-wider mt-1 block"
          style={{ color: "#F97316" }}
        >
          Admin Panel
        </span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: active ? "#F9731615" : "transparent",
                color: active ? "#F97316" : "#737373",
              }}
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-xs transition-colors hover:text-white mt-4"
        style={{ color: "#525252" }}
      >
        <ArrowLeft className="w-3 h-3" />
        Voltar ao app
      </Link>
    </aside>
  );
}
