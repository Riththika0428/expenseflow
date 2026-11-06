import { Search } from "lucide-react";

export default function CategoryFilters({
  search,
  setSearch,
  selectedType,
  setSelectedType,
}) {
  const tabs = [
    { label: "All Categories", value: "all" },
    { label: "Income", value: "income" },
    { label: "Expenses", value: "expense" },
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedType(tab.value)}
            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition
              ${
                selectedType === tab.value
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-[#2B3243] dark:bg-[#191E2B] dark:text-gray-300 dark:hover:bg-[#202738]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative w-full lg:max-w-xs">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search categories..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#191E2B] dark:text-white"
        />
      </div>
    </div>
  );
}