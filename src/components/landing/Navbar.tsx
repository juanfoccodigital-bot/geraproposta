"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Menu, X, Search, Crown, Plus, Tag, LogOut, LayoutGrid, User, Zap, ChevronDown, MessageCircle, CreditCard } from "lucide-react";
import { PlanTier } from "@/types/user";
import { PLAN_LIMITS } from "@/lib/plan-limits";
import { useAuth } from "@/contexts/AuthContext";

/* ============================================
   NAVBAR — Auth-aware via AuthContext
   Mostra opcoes diferentes para logado/deslogado
   ============================================ */

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
  onCategoriesClick?: () => void;
  activeCategory?: string;
  onCategoryFilter?: (cat: string) => void;
}

const planColors: Record<PlanTier, string> = {
  free: "#F97316",
  lite: "#CD7F32",
  pro: "#C0C0C0",
  plus: "#FFD700",
};

const planTextColors: Record<PlanTier, string> = {
  free: "#FFFFFF",
  lite: "#FFFFFF",
  pro: "#111111",
  plus: "#111111",
};

export default function Navbar({
  onSearch,
  searchValue,
  searchPlaceholder,
  onCategoriesClick,
  activeCategory,
  onCategoryFilter,
}: NavbarProps) {
  const { user, logout, loggingOut, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue || "");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [usageStats, setUsageStats] = useState<{
    dailyUsed: number; dailyLimit: number;
    monthlyUsed: number; monthlyLimit: number;
    activeProposals: number; maxActive: number;
  } | null>(null);
  const usageFetched = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle category click — filter in-place on home, or navigate to home with category param
  const handleCategoryClick = (slug: string) => {
    const newCat = activeCategory === slug ? "all" : slug;
    if (onCategoryFilter) {
      onCategoryFilter(newCat);
    } else {
      router.push(newCat === "all" ? "/#templates" : `/?category=${newCat}#templates`);
    }
  };

  // Lazy-load usage stats when dropdown opens
  useEffect(() => {
    if (showUserMenu && user && !usageFetched.current) {
      usageFetched.current = true;
      fetch("/api/usage")
        .then((r) => r.ok ? r.json() : null)
        .then((data) => { if (data) setUsageStats(data); })
        .catch(() => {});
    }
  }, [showUserMenu, user]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearch?.(value);
  };

  const isLoggedIn = !!user;

  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    { label: "Precos", href: "/pricing" },
  ];

  const authLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Links", href: "/biolink" },
    // Sites: em breve (desabilitado temporariamente)
    // ...(user && PLAN_LIMITS[user.plan].maxSites > 0 ? [{ label: "Sites", href: "/sites" }] : []),
    ...(user && PLAN_LIMITS[user.plan].crm ? [{ label: "CRM", href: "/crm" }] : []),
    { label: "Templates", href: "/templates" },
  ];

  const navLinks = isLoggedIn ? authLinks : publicLinks;

  const navCategories = [
    { label: "Social Media", slug: "social-media" },
    { label: "Trafego Pago", slug: "trafego-pago" },
    { label: "Design", slug: "design" },
    { label: "Web Design", slug: "webdesign" },
    { label: "Saude", slug: "saude" },
    { label: "Automacao", slug: "automacao" },
  ];
  const extraCategories = [
    { label: "Infoprodutor", slug: "infoprodutor" },
    { label: "Academia", slug: "academia" },
    { label: "Vibe Coding", slug: "vibe-coding" },
  ];
  const [showMoreCats, setShowMoreCats] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: "#0A0A0A", borderColor: "#1A1A1A" }}>
      {/* ── Top bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo size="md" />
        </Link>

        {/* Search bar - desktop */}
        {onSearch && (
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full flex">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={searchPlaceholder || "Busque por templates..."}
                  className="w-full pl-10 pr-4 py-2.5 rounded-l-xl border-y border-l text-sm text-white placeholder:text-white/30 focus:outline-none transition-all"
                  style={{ background: "#111111", borderColor: "#262626" }}
                />
              </div>
              <button
                className="px-5 py-2.5 rounded-r-xl text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer flex-shrink-0"
                style={{ background: "#F97316" }}
              >
                Pesquisar
              </button>
            </div>
          </div>
        )}

        {/* Spacer when no search */}
        {!onSearch && <div className="flex-1" />}

        {/* Right side — Loading */}
        {loading && (
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <div className="w-24 h-8 rounded-lg animate-pulse" style={{ background: "#1A1A1A" }} />
          </div>
        )}

        {/* Right side — Authenticated */}
        {!loading && isLoggedIn && (
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            {onCategoriesClick && (
              <button
                onClick={onCategoriesClick}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-[#1A1A1A] cursor-pointer"
                style={{ color: "#A3A3A3" }}
                title="Gerenciar Categorias"
              >
                <Tag size={14} />
                Categorias
              </button>
            )}

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-[#1A1A1A] cursor-pointer"
                style={{ color: "#A3A3A3" }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: planColors[user.plan] }}>
                  <User size={12} style={{ color: planTextColors[user.plan] }} />
                </div>
                <span className="max-w-[100px] truncate text-white/80">{user.full_name?.split(" ")[0] || "Usuario"}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: planColors[user.plan], color: planTextColors[user.plan] }}
                >
                  {PLAN_LIMITS[user.plan].label}
                </span>
                <ChevronDown size={12} className="text-white/40" />
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div
                    className="absolute right-0 top-full mt-1 w-48 rounded-xl border shadow-xl z-50 py-1"
                    style={{ background: "#111111", borderColor: "#262626" }}
                  >
                    <div className="px-3 py-2 border-b" style={{ borderColor: "#262626" }}>
                      <p className="text-xs font-medium text-white truncate">{user.full_name || "Usuario"}</p>
                      <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                    </div>
                    {usageStats && (
                      <div className="px-3 py-2 border-b" style={{ borderColor: "#262626" }}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-white/40">
                            {usageStats.dailyLimit !== Infinity
                              ? `${usageStats.dailyUsed}/${usageStats.dailyLimit} hoje`
                              : usageStats.monthlyLimit !== Infinity
                                ? `${usageStats.monthlyUsed}/${usageStats.monthlyLimit} este mes`
                                : "Ilimitado"}
                          </span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "#262626" }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(100,
                                usageStats.dailyLimit !== Infinity
                                  ? (usageStats.dailyUsed / usageStats.dailyLimit) * 100
                                  : usageStats.monthlyLimit !== Infinity
                                    ? (usageStats.monthlyUsed / usageStats.monthlyLimit) * 100
                                    : 5
                              )}%`,
                              backgroundColor: "#F97316",
                            }}
                          />
                        </div>
                        {usageStats.maxActive !== Infinity && (
                          <p className="text-[10px] text-white/30 mt-1">
                            {usageStats.activeProposals}/{usageStats.maxActive} propostas ativas
                          </p>
                        )}
                      </div>
                    )}
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-[#1A1A1A] hover:text-white transition-all"
                    >
                      <LayoutGrid size={13} />
                      Dashboard
                    </Link>
                    <Link
                      href="/templates"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-[#1A1A1A] hover:text-white transition-all"
                    >
                      <Search size={13} />
                      Templates
                    </Link>
                    {user.plan === "free" ? (
                      <Link
                        href="/pricing"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-[#1A1A1A] transition-all"
                        style={{ color: "#F97316" }}
                      >
                        <Zap size={13} />
                        Fazer Upgrade
                      </Link>
                    ) : (
                      <Link
                        href="/dashboard/assinatura"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-[#1A1A1A] hover:text-white transition-all"
                      >
                        <CreditCard size={13} />
                        Minha Assinatura
                      </Link>
                    )}
                    <Link
                      href="/suporte"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-[#1A1A1A] hover:text-white transition-all"
                    >
                      <MessageCircle size={13} />
                      Suporte
                    </Link>
                    <div className="border-t" style={{ borderColor: "#262626" }} />
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      disabled={loggingOut}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-red-400/70 hover:bg-red-900/10 hover:text-red-400 transition-all w-full cursor-pointer disabled:opacity-40"
                    >
                      <LogOut size={13} />
                      {loggingOut ? "Saindo..." : "Sair"}
                    </button>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/editor/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#F97316" }}
            >
              <Plus size={15} />
              Nova Proposta
            </Link>
          </div>
        )}

        {/* Right side — Not authenticated */}
        {!loading && !isLoggedIn && (
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ color: "#F97316" }}
            >
              <Crown size={14} />
              Assine o Premium
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#A3A3A3" }}
            >
              Cadastre-se
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:bg-[#1A1A1A]"
              style={{ color: "#FFFFFF", borderColor: "#333333" }}
            >
              Entrar
            </Link>
          </div>
        )}

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          {!loading && isLoggedIn && (
            <Link
              href="/editor/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
              style={{ backgroundColor: "#F97316" }}
            >
              <Plus size={14} />
              Nova
            </Link>
          )}
          <button onClick={() => setOpen(!open)} className="p-2 cursor-pointer" style={{ color: "#A3A3A3" }}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Sub nav ── */}
      <div className="border-t hidden md:block" style={{ background: "#0A0A0A", borderColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-medium whitespace-nowrap transition-colors hover:text-white"
              style={{ color: pathname === l.href ? "#F97316" : "#A3A3A3" }}
            >
              {l.label}
            </Link>
          ))}
          <span className="text-xs" style={{ color: "#333" }}>|</span>
          {navCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryClick(cat.slug)}
              className="text-xs font-medium whitespace-nowrap transition-colors hover:text-white cursor-pointer"
              style={{ color: activeCategory === cat.slug ? "#F97316" : "#737373" }}
            >
              {cat.label}
            </button>
          ))}
          {/* Mais dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreCats(!showMoreCats)}
              className="text-xs font-medium whitespace-nowrap transition-colors hover:text-white cursor-pointer inline-flex items-center gap-1"
              style={{ color: extraCategories.some((c) => activeCategory === c.slug) ? "#F97316" : "#737373" }}
            >
              Mais
              <ChevronDown size={10} />
            </button>
            {showMoreCats && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowMoreCats(false)} />
                <div
                  className="absolute left-0 top-full mt-2 w-40 rounded-xl border shadow-xl z-50 py-1"
                  style={{ background: "#111111", borderColor: "#262626" }}
                >
                  {extraCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        handleCategoryClick(cat.slug);
                        setShowMoreCats(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium transition-all hover:bg-[#1A1A1A] cursor-pointer"
                      style={{ color: activeCategory === cat.slug ? "#F97316" : "#A3A3A3" }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="md:hidden px-4 pb-4 pt-2 border-t" style={{ background: "#0A0A0A", borderColor: "#1A1A1A" }}>
          {/* Mobile search */}
          {onSearch && (
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={searchPlaceholder || "Busque por templates..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white placeholder:text-white/30 focus:outline-none"
                style={{ background: "#111111", borderColor: "#262626" }}
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium"
                style={{ color: pathname === l.href ? "#F97316" : "#A3A3A3" }}
              >
                {l.label}
              </Link>
            ))}

            {/* Auth mobile menu */}
            {!loading && isLoggedIn ? (
              <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: "#262626" }}>
                <div className="flex items-center gap-2 px-1 py-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: planColors[user.plan] }}>
                    <User size={13} style={{ color: planTextColors[user.plan] }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">{user.full_name?.split(" ")[0] || "Usuario"}</p>
                    <p className="text-[10px] text-white/40">{PLAN_LIMITS[user.plan].label}</p>
                  </div>
                </div>
                {onCategoriesClick && (
                  <button
                    onClick={() => { setOpen(false); onCategoriesClick(); }}
                    className="flex items-center gap-2 px-2 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
                    style={{ color: "#A3A3A3" }}
                  >
                    <Tag size={14} />
                    Categorias
                  </button>
                )}
                {(user.plan === "free" || user.plan === "lite") && (
                  <Link
                    href="/pricing"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-2 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ color: "#F97316" }}
                  >
                    <Zap size={14} />
                    Fazer Upgrade
                  </Link>
                )}
                <button
                  onClick={() => { setOpen(false); logout(); }}
                  disabled={loggingOut}
                  className="flex items-center gap-2 px-2 py-2.5 rounded-lg text-sm font-medium text-red-400/70 cursor-pointer disabled:opacity-40"
                >
                  <LogOut size={14} />
                  {loggingOut ? "Saindo..." : "Sair"}
                </button>
              </div>
            ) : !loading ? (
              <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: "#262626" }}>
                <Link href="/pricing" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold" style={{ color: "#F97316" }}>
                  <Crown size={14} />
                  Assine o Premium
                </Link>
                <Link href="/signup" className="px-4 py-2.5 rounded-lg text-sm font-medium text-center border" style={{ color: "#A3A3A3", borderColor: "#262626" }}>
                  Cadastre-se
                </Link>
                <Link href="/login" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white text-center" style={{ background: "#F97316" }}>
                  Entrar
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
