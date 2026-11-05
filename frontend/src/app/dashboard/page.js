"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { CalendarDays, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Welcome back! Here's your financial overview.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)]">
              <CalendarDays size={17} />
              This Month
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
              <Plus size={18} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Temporary Content */}
        <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-10 text-center">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Your financial dashboard starts here
          </h2>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Dashboard cards, charts and transactions will be added in the next phases.
          </p>
        </div>

      </div>
    </DashboardLayout>
  );
}
