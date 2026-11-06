import { formatCurrency } from "@/lib/formatCurrency";

export default function TopCategories({ data }) {
  const sortedCategories = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const highest = sortedCategories[0]?.value || 1;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Top Spending Categories
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your highest expense categories
        </p>
      </div>

      <div className="space-y-5">
        {sortedCategories.map((category, index) => (
          <div key={category.name}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-[#202738] dark:text-gray-300">
                  {index + 1}
                </span>

                <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </div>

              <span className="shrink-0 text-sm font-semibold text-gray-900 dark:text-white">
                {formatCurrency(category.value)}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-[#2B3243]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(category.value / highest) * 100}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}