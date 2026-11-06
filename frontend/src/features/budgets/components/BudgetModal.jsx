"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const categories = [
  { name: "Food", icon: "Utensils", color: "#F59E0B" },
  { name: "Transport", icon: "Car", color: "#3978D5" },
  { name: "Shopping", icon: "ShoppingBag", color: "#E05252" },
  { name: "Education", icon: "GraduationCap", color: "#5145CD" },
  { name: "Healthcare", icon: "HeartPulse", color: "#16A36A" },
  { name: "Entertainment", icon: "Gamepad2", color: "#A855F7" },
];

const emptyForm = {
  category: "Food",
  limit: "",
  month: "",
};

export default function BudgetModal({
  isOpen,
  onClose,
  onSave,
  budget,
  selectedMonth,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm(
        budget
          ? {
              category: budget.category,
              limit: String(budget.limit),
              month: budget.month,
            }
          : {
              ...emptyForm,
              month: selectedMonth,
            }
      );
    }
  }, [isOpen, budget, selectedMonth]);

  if (!isOpen) return null;

  const handleCategoryChange = (event) => {
    setForm({ ...form, category: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const limit = Number(form.limit);

    if (!form.category || !form.month || !Number.isFinite(limit) || limit <= 0) {
      return;
    }

    const selectedCategory = categories.find(
      (item) => item.name === form.category
    );

    onSave({
      ...budget,
      category: form.category,
      limit,
      month: form.month,
      icon: selectedCategory?.icon || "Tag",
      color: selectedCategory?.color || "#5145CD",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#191E2B]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {budget ? "Edit Budget" : "Create Budget"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Set a spending limit for a category.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-[#202738]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expense Category
            </label>

            <select
              value={form.category}
              onChange={handleCategoryChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Budget Limit (LKR)
            </label>

            <input
              type="number"
              min="0.01"
              step="0.01"
              required
              value={form.limit}
              onChange={(event) =>
                setForm({ ...form, limit: event.target.value })
              }
              placeholder="Enter budget amount"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Budget Month
            </label>

            <input
              type="month"
              required
              value={form.month}
              onChange={(event) =>
                setForm({ ...form, month: event.target.value })
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-[#2B3243] dark:text-gray-300 dark:hover:bg-[#202738]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {budget ? "Save Changes" : "Create Budget"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}