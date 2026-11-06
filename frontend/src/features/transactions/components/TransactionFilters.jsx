"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export default function TransactionFilters({
  search,
  setSearch,
  filter,
  setFilter,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center
      sm:justify-between">

      <div className="relative w-full sm:max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2
            text-[var(--text-secondary)]"
        />

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)]
            bg-[var(--surface)] py-3 pl-10 pr-4 text-sm
            text-[var(--foreground)] outline-none
            focus:border-[#5145CD]"
        />
      </div>

      <div className="flex items-center gap-2">
        <SlidersHorizontal
          size={18}
          className="text-[var(--text-secondary)]"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)]
            bg-[var(--surface)] px-4 py-3 text-sm
            text-[var(--foreground)] outline-none
            focus:border-[#5145CD] sm:w-44"
        >
          <option value="all">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </div>
    </div>
  );
}