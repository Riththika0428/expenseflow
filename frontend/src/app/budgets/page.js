"use client";

import { useMemo, useState } from "react";
import { Plus, Wallet } from "lucide-react";
import { toast } from "sonner";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { initialBudgets } from "@/features/budgets/components/budgetData";
import BudgetStats from "@/features/budgets/components/BudgetStats";
import BudgetFilters from "@/features/budgets/components/BudgetFilters";
import BudgetCard from "@/features/budgets/components/BudgetCard";
import BudgetModal from "@/features/budgets/components/BudgetModal";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState(initialBudgets);

  const [selectedMonth, setSelectedMonth] = useState("2026-11");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const filteredBudgets = useMemo(() => {
    return budgets.filter(
      (budget) => budget.month === selectedMonth
    );
  }, [budgets, selectedMonth]);

  const handleAdd = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    const duplicate = budgets.some(
      (item) =>
        item.category === formData.category &&
        item.month === formData.month &&
        item.id !== editingBudget?.id
    );

    if (duplicate) {
      toast.error(
        "A budget already exists for this category and month."
      );
      return;
    }

    if (editingBudget) {
      setBudgets((current) =>
        current.map((item) =>
          item.id === editingBudget.id
            ? { ...item, ...formData }
            : item
        )
      );

      toast.success("Budget updated successfully.");
    } else {
      setBudgets((current) => [
        ...current,
        {
          ...formData,
          id: Date.now(),
          spent: 0,
        },
      ]);

      toast.success("Budget created successfully.");
    }

    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const handleDelete = (id) => {
    const budget = budgets.find((item) => item.id === id);

    if (!budget) return;

    const confirmed = window.confirm(
      `Delete the ${budget.category} budget for ${budget.month}?`
    );

    if (!confirmed) return;

    setBudgets((current) =>
      current.filter((item) => item.id !== id)
    );

    toast.success("Budget deleted successfully.");
  };

  return (
    <DashboardLayout>
      <div className="space-y-7">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Budgets
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Plan your spending and stay within your financial limits.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Budget
          </button>
        </div>

        {/* Summary */}
        <BudgetStats budgets={filteredBudgets} />

        {/* Month Filter */}
        <BudgetFilters
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />

        {/* Budget Cards */}
        {filteredBudgets.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredBudgets.map((budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center dark:border-[#2B3243] dark:bg-[#191E2B]">
            <Wallet
              size={36}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
              No budgets for this month
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Create a budget to start tracking your spending.
            </p>

            <button
              onClick={handleAdd}
              className="mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              + Create your first budget
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        onSave={handleSave}
        budget={editingBudget}
        selectedMonth={selectedMonth}
      />
    </DashboardLayout>
  );
}