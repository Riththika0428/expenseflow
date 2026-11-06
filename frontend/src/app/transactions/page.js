"use client";

import { useMemo, useState } from "react";
import { Plus, ReceiptText } from "lucide-react";
import { toast } from "sonner";

import DashboardLayout from "@/components/layout/DashboardLayout";
import TransactionStats from "@/features/transactions/components/TransactionStats";
import TransactionFilters from "@/features/transactions/components/TransactionFilters";
import TransactionTable from "@/features/transactions/components/TransactionTable";
import TransactionModal from "@/features/transactions/components/TransactionModal";
import { initialTransactions } from "@/features/transactions/components/transactionData";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  const openAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingTransaction) {
      setTransactions((previous) =>
        previous.map((item) =>
          item.id === editingTransaction.id
            ? { ...item, ...formData }
            : item
        )
      );

      toast.success("Transaction updated successfully");
    } else {
      const newTransaction = {
        ...formData,
        id: Date.now(),
      };

      setTransactions((previous) => [
        newTransaction,
        ...previous,
      ]);

      toast.success("Transaction added successfully");
    }
  };

  const handleDelete = (id) => {
    setTransactions((previous) =>
      previous.filter((item) => item.id !== id)
    );

    toast.success("Transaction deleted");
  };

  return (
    <DashboardLayout>
      <div className="space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4
          sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <ReceiptText size={23} className="text-[#5145CD]" />
              <h1 className="text-2xl font-bold
                text-[var(--foreground)]">
                Transactions
              </h1>
            </div>

            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Manage and track all your income and expenses.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center justify-center gap-2
              rounded-xl bg-[#5145CD] px-5 py-3 text-sm
              font-semibold text-white transition hover:bg-[#4035B5]"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>

        {/* Summary */}
        <TransactionStats transactions={transactions} />

        {/* Transaction List */}
        <section className="space-y-5">
          <div>
            <h2 className="text-lg font-semibold
              text-[var(--foreground)]">
              All Transactions
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {filteredTransactions.length} transactions found
            </p>
          </div>

          <TransactionFilters
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          <TransactionTable
            transactions={filteredTransactions}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </section>

        {/* Add/Edit Modal */}
        <TransactionModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          editingTransaction={editingTransaction}
        />

      </div>
    </DashboardLayout>
  );
}