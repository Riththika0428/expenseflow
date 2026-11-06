import { CalendarDays } from "lucide-react";

export default function BudgetFilters({
  selectedMonth,
  setSelectedMonth,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Category Budgets
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your spending against each category limit.
        </p>
      </div>

      <div className="relative">
        <CalendarDays
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="month"
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#191E2B] dark:text-white sm:w-auto"
        />
      </div>
    </div>
  );
}