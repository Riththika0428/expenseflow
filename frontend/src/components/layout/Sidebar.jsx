
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  X,
  WalletCards,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: Wallet,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  isOpen = true,
  onClose,
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          flex h-screen w-64 flex-col
          border-r border-gray-200
          bg-white dark:bg-gray-900
          dark:border-gray-800
          transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <WalletCards size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ExpenseFlow
              </h1>

              <p className="text-xs text-gray-500">
                Finance Management
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white"
              aria-label="Close sidebar"
            >
              <X size={22} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="px-3 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <div className="space-y-1">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-colors
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  <Icon size={20} />

                  <span>{item.name}</span>

                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-emerald-600" />
                  )}
                </Link>
              );
            })}

          </div>
        </nav>

        {/* Logout Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <LogoutButton />
        </div>

        {/* Footer */}
        <div className="px-6 pb-4">
          <p className="text-xs text-center text-gray-400">
            © 2026 ExpenseFlow
          </p>
        </div>

      </aside>
    </>
  );
}
