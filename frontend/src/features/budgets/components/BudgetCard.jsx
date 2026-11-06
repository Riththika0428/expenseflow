import {
  Utensils,
  Car,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Gamepad2,
  Tag,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatCurrency";

const iconMap = {
  Utensils,
  Car,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  Gamepad2,
  Tag,
};

export default function BudgetCard({ budget, onEdit, onDelete }) {
  const Icon = iconMap[budget.icon] || Tag;

  const percentage =
    budget.limit > 0
      ? (budget.spent / budget.limit) * 100
      : 0;

  const progress = Math.min(percentage, 100);
  const remaining = budget.limit - budget.spent;

  const isExceeded = percentage > 100;
  const isWarning = percentage >= 80 && !isExceeded;

  const progressColor = isExceeded
    ? "bg-red-500"
    : isWarning
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2B3243] dark:bg-[#191E2B]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${budget.color}20` }}
          >
            <Icon size={21} style={{ color: budget.color }} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {budget.category}
            </h3>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Monthly budget
            </p>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(budget)}
            aria-label={`Edit ${budget.category} budget`}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-[#202738]"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(budget.id)}
            aria-label={`Delete ${budget.category} budget`}
            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Amounts */}
      <div className="mt-6 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Amount spent
          </p>

          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(budget.spent)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Budget limit
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
            {formatCurrency(budget.limit)}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Budget usage
          </span>

          <span
            className={`text-xs font-semibold ${
              isExceeded
                ? "text-red-600"
                : isWarning
                  ? "text-amber-600"
                  : "text-emerald-600"
            }`}
          >
            {percentage.toFixed(1)}%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-[#2B3243]">
          <div
            className={`h-full rounded-full transition-all ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 dark:border-[#2B3243]">
        {isExceeded ? (
          <>
            <AlertTriangle size={16} className="text-red-500" />
            <p className="text-xs font-medium text-red-600">
              Exceeded by {formatCurrency(Math.abs(remaining))}
            </p>
          </>
        ) : isWarning ? (
          <>
            <AlertTriangle size={16} className="text-amber-500" />
            <p className="text-xs font-medium text-amber-600">
              {formatCurrency(remaining)} remaining
            </p>
          </>
        ) : (
          <>
            <CheckCircle2 size={16} className="text-emerald-500" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatCurrency(remaining)} remaining
            </p>
          </>
        )}
      </div>
    </div>
  );
}