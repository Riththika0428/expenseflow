"use client";

import { useMemo, useState } from "react";
import { Plus, Tags } from "lucide-react";
import { toast } from "sonner";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { initialCategories } from "@/features/categories/components/categoryData";
import CategoryStats from "@/features/categories/components/CategoryStats";
import CategoryFilters from "@/features/categories/components/CategoryFilters";
import CategoryCard from "@/features/categories/components/CategoryCard";
import CategoryModal from "@/features/categories/components/CategoryModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch = category.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        selectedType === "all" || category.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [categories, search, selectedType]);

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    const duplicate = categories.some(
      (item) =>
        item.name.toLowerCase() === formData.name.toLowerCase() &&
        item.type === formData.type &&
        item.id !== editingCategory?.id
    );

    if (duplicate) {
      toast.error("A category with this name already exists.");
      return;
    }

    if (editingCategory) {
      setCategories((current) =>
        current.map((item) =>
          item.id === editingCategory.id
            ? { ...item, ...formData }
            : item
        )
      );

      toast.success("Category updated successfully.");
    } else {
      const newCategory = {
        ...formData,
        id: Date.now(),
        transactionCount: 0,
      };

      setCategories((current) => [...current, newCategory]);
      toast.success("Category created successfully.");
    }

    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    const category = categories.find((item) => item.id === id);

    if (!category) return;

    if (category.transactionCount > 0) {
      toast.error(
        "This category has transactions. Reassign them before deleting it."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    setCategories((current) =>
      current.filter((item) => item.id !== id)
    );

    toast.success("Category deleted successfully.");
  };

  return (
    <DashboardLayout>
      <div className="space-y-7">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Categories
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Organize and manage your income and expense categories.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Summary Cards */}
        <CategoryStats categories={categories} />

        {/* Search and Filters */}
        <CategoryFilters
          search={search}
          setSearch={setSearch}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Category Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {selectedType === "all"
                ? "All Categories"
                : selectedType === "income"
                  ? "Income Categories"
                  : "Expense Categories"}
            </h2>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredCategories.length} categories
            </span>
          </div>

          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center dark:border-[#2B3243] dark:bg-[#191E2B]">
              <Tags
                size={35}
                className="mx-auto text-gray-400"
              />

              <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                No categories found
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Try another search or create a new category.
              </p>

              <button
                onClick={handleAdd}
                className="mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                + Create category
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
        category={editingCategory}
      />
    </DashboardLayout>
  );
}