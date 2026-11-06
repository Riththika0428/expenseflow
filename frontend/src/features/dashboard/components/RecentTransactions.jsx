"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatCurrency";

const transactions = [
  {
    id: 1,
    title: "Monthly Salary",
    category: "Salary",
    date: "Nov 05, 2026",
    amount: 120000,
    type: "income",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    category: "Food",
    date: "Nov 04, 2026",
    amount: 8500,
    type: "expense",
  },
  {
    id: 3,
    title: "Freelance Project",
    category: "Freelance",
    date: "Nov 03, 2026",
    amount: 25000,
    type: "income",
  },
  {
    id: 4,
    title: "Bus & Train",
    category: "Transport",
    date: "Nov 02, 2026",
    amount: 2500,
    type: "expense",
  },
  {
    id: 5,
    title: "Online Course",
    category: "Education",
    date: "Nov 01, 2026",
    amount: 4500,
    type: "expense",
  },
];

export default function RecentTransactions() {
  return (
    <div className="overflow-hidden rounded-2xl border
      border-[var(--border)] bg-[var(--surface)] shadow-sm">

      <div className="flex items-center justify-between p-5">
        <div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            Recent Transactions
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Your latest financial activities
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[var(--text-secondary)]
            transition hover:bg-[var(--background)]"
          aria-label="More transaction options"
        >
          <MoreHorizontal size={21} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-y border-[var(--border)]
              bg-[var(--background)]">
              <th className="px-5 py-3 text-xs font-semibold
                text-[var(--text-secondary)]">Transaction</th>
              <th className="px-5 py-3 text-xs font-semibold
                text-[var(--text-secondary)]">Category</th>
              <th className="px-5 py-3 text-xs font-semibold
                text-[var(--text-secondary)]">Date</th>
              <th className="px-5 py-3 text-right text-xs font-semibold
                text-[var(--text-secondary)]">Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "income";

              return (
                <tr
                  key={transaction.id}
                  className="border-b border-[var(--border)]
                    last:border-0 transition hover:bg-[var(--background)]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center
                        justify-center rounded-xl ${
                          isIncome
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}>
                        {isIncome
                          ? <ArrowDownLeft size={18} />
                          : <ArrowUpRight size={18} />}
                      </div>

                      <span className="whitespace-nowrap text-sm
                        font-medium text-[var(--foreground)]">
                        {transaction.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm
                    text-[var(--text-secondary)]">
                    {transaction.category}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm
                    text-[var(--text-secondary)]">
                    {transaction.date}
                  </td>

                  <td className={`whitespace-nowrap px-5 py-4 text-right
                    text-sm font-semibold ${
                      isIncome ? "text-emerald-600" : "text-red-600"
                    }`}>
                    {isIncome ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[var(--border)] p-4 text-center">
        <button
          type="button"
          className="text-sm font-semibold text-[#5145CD]
            transition hover:text-[#4035B5]"
        >
          View All Transactions
        </button>
      </div>
    </div>
  );
}