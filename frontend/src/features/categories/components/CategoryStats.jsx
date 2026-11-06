import { Tags, TrendingUp, TrendingDown } from "lucide-react";

export default function CategoryStats({ categories }) {
  const total = categories.length;

  const income = categories.filter(
    (category) => category.type === "income"
  ).length;

  const expenses = categories.filter(
    (category) => category.type === "expense"
  ).length;

  const stats = [
    {
      title: "Total Categories",
      value: total,
      icon: Tags,
      color: "text-indigo-600",
      background: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      title: "Income Categories",
      value: income,
      icon: TrendingUp,
      color: "text-emerald-600",
      background: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      title: "Expense Categories",
      value: expenses,
      icon: TrendingDown,
      color: "text-red-600",
      background: "bg-red-50 dark:bg-red-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm
              dark:border-[#2B3243] dark:bg-[#191E2B]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>

              <div className={`rounded-xl p-2.5 ${stat.background}`}>
                <Icon size={20} className={stat.color} />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}