"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatCard({
  title,
  amount,
  icon: Icon,
  iconColor = "text-indigo-600",
  iconBackground = "bg-indigo-50",
  change,
  trend = "up",
  description = "Compared to last month",
  formatValue,
}) {
  const isPositive = trend === "up";

  return (
    <div className="rounded-2xl border border-[var(--border)]
      bg-[var(--surface)] p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight
            text-[var(--foreground)] sm:text-3xl">
            {formatValue ? formatValue(amount) : amount}
          </h2>
        </div>

        <div className={cn(
          "flex h-11 w-11 items-center justify-center rounded-xl",
          iconBackground,
          iconColor
        )}>
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {change !== undefined && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
            isPositive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          )}>
            {isPositive
              ? <ArrowUpRight size={14} />
              : <ArrowDownRight size={14} />}
            {change}
          </span>

          <span className="text-xs text-[var(--text-secondary)]">
            {description}
          </span>
        </div>
      )}
    </div>
  );
}