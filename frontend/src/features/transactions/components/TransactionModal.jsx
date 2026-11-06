"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const categories = [
  "Food",
  "Transport",
  "Education",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Salary",
  "Freelance",
  "Other",
];

const emptyForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "Food",
  date: new Date().toLocaleDateString("en-CA"),
  note: "",
};

export default function TransactionModal({
  open,
  onClose,
  onSave,
  editingTransaction,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      setForm(editingTransaction
        ? { ...editingTransaction, amount: String(editingTransaction.amount) }
        : emptyForm
      );
    }
  }, [open, editingTransaction]);

  if (!open) return null;

  const updateField = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number(form.amount);

    if (!form.title.trim() || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      amount,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center
      justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto
          rounded-2xl border border-[var(--border)]
          bg-[var(--surface)] shadow-xl"
      >
        <div className="flex items-center justify-between
          border-b border-[var(--border)] p-5">
          <div>
            <h2 id="transaction-modal-title" className="text-lg
              font-semibold text-[var(--foreground)]">
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Enter your transaction details below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-[var(--text-secondary)]
              hover:bg-[var(--background)]"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium
              text-[var(--foreground)]">
              Transaction Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              {["income", "expense"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    updateField("type", type);
                    updateField(
                      "category",
                      type === "income" ? "Salary" : "Food"
                    );
                  }}
                  className={`rounded-xl border px-4 py-3 text-sm
                    font-semibold capitalize ${
                      form.type === type
                        ? type === "income"
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-red-500 bg-red-50 text-red-700"
                        : "border-[var(--border)] text-[var(--text-secondary)]"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium
              text-[var(--foreground)]">
              Transaction Name
            </label>
            <input
              required
              maxLength={80}
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. Grocery Shopping"
              className="w-full rounded-xl border border-[var(--border)]
                bg-[var(--surface)] px-4 py-3 text-sm
                text-[var(--foreground)] outline-none
                focus:border-[#5145CD]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium
              text-[var(--foreground)]">
              Amount (LKR)
            </label>
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={(e) => updateField("amount", e.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-xl border border-[var(--border)]
                bg-[var(--surface)] px-4 py-3 text-sm
                text-[var(--foreground)] outline-none
                focus:border-[#5145CD]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium
                text-[var(--foreground)]">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full rounded-xl border border-[var(--border)]
                  bg-[var(--surface)] px-3 py-3 text-sm
                  text-[var(--foreground)] outline-none"
              >
                {categories
                  .filter((category) =>
                    form.type === "income"
                      ? ["Salary", "Freelance", "Other"].includes(category)
                      : !["Salary", "Freelance"].includes(category)
                  )
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium
                text-[var(--foreground)]">
                Date
              </label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="w-full rounded-xl border border-[var(--border)]
                  bg-[var(--surface)] px-3 py-3 text-sm
                  text-[var(--foreground)] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium
              text-[var(--foreground)]">
              Note (Optional)
            </label>
            <textarea
              rows={3}
              maxLength={300}
              value={form.note}
              onChange={(e) => updateField("note", e.target.value)}
              placeholder="Add a short note..."
              className="w-full resize-none rounded-xl border
                border-[var(--border)] bg-[var(--surface)]
                px-4 py-3 text-sm text-[var(--foreground)]
                outline-none focus:border-[#5145CD]"
            />
          </div>

          <div className="flex justify-end gap-3 border-t
            border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[var(--border)]
                px-4 py-2.5 text-sm font-medium
                text-[var(--foreground)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#5145CD] px-5 py-2.5
                text-sm font-semibold text-white hover:bg-[#4035B5]"
            >
              {editingTransaction ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}