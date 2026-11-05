"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Wallet,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
} from "lucide-react";

import {
  navigationItems,
  secondaryNavigation,
} from "@/constants/navigation";

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) {
  const pathname = usePathname();

  const renderLinks = (items) =>
    items.map((item) => {
      const Icon = item.icon;

      const active = pathname === item.href;

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          title={collapsed ? item.title : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
            active
              ? "bg-[var(--primary-light)] text-[var(--primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-[var(--foreground)]"
          }`}
        >
          <Icon size={20} className="shrink-0" />

          {!collapsed && <span>{item.title}</span>}
        </Link>
      );
    });

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-all duration-300 lg:translate-x-0 ${
          collapsed ? "lg:w-[76px]" : "lg:w-[250px]"
        } ${
          mobileOpen
            ? "translate-x-0 w-[260px]"
            : "-translate-x-full w-[260px]"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[72px] items-center justify-between border-b border-[var(--border)] px-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5145CD] text-white">
              <Wallet size={20} />
            </div>

            <span
              className={`text-lg font-bold tracking-tight text-[var(--foreground)] ${
                collapsed ? "lg:hidden" : ""
              }`}
            >
              ExpenseFlow
            </span>
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--background)] lg:block"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 space-y-8 overflow-y-auto px-3 py-6">
          <div className="space-y-2">
            {!collapsed && (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Main Menu
              </p>
            )}

            <nav className="space-y-1">
              {renderLinks(navigationItems)}
            </nav>
          </div>

          <div className="space-y-2">
            {!collapsed && (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Other
              </p>
            )}

            <nav className="space-y-1">
              {renderLinks(secondaryNavigation)}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] p-3">
          <button
            title={collapsed ? "Logout" : undefined}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--expense)] transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}