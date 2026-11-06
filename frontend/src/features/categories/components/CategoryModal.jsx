"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  type: "expense",
  icon: "Tag",
  color: "#5145CD",
};

const iconOptions = [
  "Tag",
  "Utensils",
  "Car",
  "GraduationCap",
  "ShoppingBag",
  "HeartPulse",
  "BriefcaseBusiness",
  "Laptop",
];

const colorOptions = [
  "#5145CD",
  "#16A36A",
  "#E05252",
  "#F59E0B",
  "#3978D5",
  "#A855F7",
  "#EC4899",
  "#64748B",
];

export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) {
      setForm(
        category
          ? {
              name: category.name,
              type: category.type,
              icon: category.icon,
              color: category.color,
            }
          : emptyForm
      );
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) return;

    onSave({
      ...category,
      ...form,
      name: form.name.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#191E2B]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {category ? "Edit Category" : "Add Category"}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Organize your financial transactions.
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
              Category Name
            </label>

            <input
              type="text"
              required
              maxLength={30}
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              placeholder="e.g. Food"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category Type
            </label>

            <select
              value={form.type}
              onChange={(event) =>
                setForm({ ...form, type: event.target.value })
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Icon
            </label>

            <select
              value={form.icon}
              onChange={(event) =>
                setForm({ ...form, icon: event.target.value })
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-[#2B3243] dark:bg-[#202738] dark:text-white"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category Color
            </label>

            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm({ ...form, color })}
                  aria-label={`Select color ${color}`}
                  aria-pressed={form.color === color}
                  className={`h-8 w-8 rounded-full transition ${
                    form.color === color
                      ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-[#191E2B]"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
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
              {category ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}