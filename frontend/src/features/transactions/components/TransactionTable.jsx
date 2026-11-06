"use client";

import { Pencil, Trash2, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/formatCurrency";

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border)]
        bg-[var(--surface)] px-5 py-16 text-center">
        <p className="font-semibold text-[var(--foreground)]">
          No transactions found
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border
      border-[var(--border)] bg-[var(--surface)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-[var(--border)]
              bg-[var(--background)]">
              {["Transaction", "Category", "Date", "Type", "Amount", "Actions"]
                .map((heading) => (
                  <th key={heading} className="px-5 py-4 text-xs
                    font-semibold text-[var(--text-secondary)]">
                    {heading}
                  </th>
                ))}
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => {
              const isIncome = item.type === "income";

              return (
                <tr key={item.id} className="border-b
                  border-[var(--border)] last:border-0
                  hover:bg-[var(--background)]">
                  <td className="px-5 py-4">
                    <p className="font-medium text-sm
                      text-[var(--foreground)]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {item.note || "No description"}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm
                    text-[var(--text-secondary)]">
                    {item.category}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm
                    text-[var(--text-secondary)]">
                    {new Date(`${item.date}T00:00:00`).toLocaleDateString(
                      "en-LK",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1
                      rounded-full px-2.5 py-1 text-xs font-medium ${
                        isIncome
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-700"
                      }`}>
                      {isIncome
                        ? <ArrowDownLeft size={13} />
                        : <ArrowUpRight size={13} />}
                      {isIncome ? "Income" : "Expense"}
                    </span>
                  </td>

                  <td className={`whitespace-nowrap px-5 py-4 text-sm
                    font-semibold ${
                      isIncome ? "text-emerald-600" : "text-red-600"
                    }`}>
                    {isIncome ? "+" : "-"}{formatCurrency(item.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        aria-label={`Edit ${item.title}`}
                        className="rounded-lg p-2 text-[var(--text-secondary)]
                          hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        aria-label={`Delete ${item.title}`}
                        className="rounded-lg p-2 text-[var(--text-secondary)]
                          hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}