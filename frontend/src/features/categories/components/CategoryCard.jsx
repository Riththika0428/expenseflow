import {
  Utensils,
  Car,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
  BriefcaseBusiness,
  Laptop,
  Tag,
  Pencil,
  Trash2,
} from "lucide-react";

const iconMap = {
  Utensils,
  Car,
  GraduationCap,
  ShoppingBag,
  HeartPulse,
  BriefcaseBusiness,
  Laptop,
  Tag,
};

export default function CategoryCard({ category, onEdit, onDelete }) {
  const Icon = iconMap[category.icon] || Tag;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#2B3243] dark:bg-[#191E2B]">
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <Icon size={23} style={{ color: category.color }} />
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(category)}
            aria-label={`Edit ${category.name}`}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-[#202738]"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(category.id)}
            aria-label={`Delete ${category.name}`}
            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {category.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              category.type === "income"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {category.type === "income" ? "Income" : "Expense"}
          </span>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {category.transactionCount} transactions
          </span>
        </div>
      </div>
    </div>
  );
}