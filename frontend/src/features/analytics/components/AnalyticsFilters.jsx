import { CalendarDays } from "lucide-react";

export default function AnalyticsFilters({ period, setPeriod }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Financial Overview
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Review your financial performance.
        </p>
      </div>

      <div className="relative">
        <CalendarDays
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#191E2B] dark:text-white sm:w-auto"
        >
          <option value="3">Last 3 months</option>
          <option value="6">Last 6 months</option>
          <option value="12">Last 12 months</option>
        </select>
      </div>
    </div>
  );
}