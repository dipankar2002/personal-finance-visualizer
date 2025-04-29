"use client";

import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";
import DashboardSummary from "@/components/DashboardSummary";
import CategoryPieChart from "@/components/CategoryPieChart";
import SpendingInsights from "@/components/SpendingInsights";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import BudgetForm from "@/components/BudgetForm";
import Navbar from "@/components/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const getCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed (0 = January)
    return `${year}-${month}`;
  };

  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const fetchBudgets = async () => {
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const addTransaction = async (txn) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(txn),
    });
    const newTxn = await res.json();
    setTransactions([...transactions, newTxn]);
  };

  const deleteTransaction = async (index) => {
    const transactionId = transactions[index]._id;

    try {
      const res = await fetch(`/api/transactions`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: transactionId }),
      });

      if (!res.ok) {
        toast.error("Failed to delete transaction");
      }

      toast.success("Transaction deleted successfully");
      setTransactions(transactions.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
      toast.error("Error deleting transaction");
    }
  };

  const editTransaction = async (index, updateTxn) => {
    const transactionId = transactions[index]._id;

    try {
      const res = await fetch(`/api/transactions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: transactionId, ...updateTxn }),
      });

      if (!res.ok) {
        toast.error("Failed to edit transaction");
      }

      toast.success("Transaction edited successfully");

      const updatedTransaction = await res.json();
      setTransactions(
        transactions.map((txn, i) => (i === index ? updatedTransaction : txn))
      );
    } catch (error) {
      console.error(error);
      toast.error("Error editing transaction");
    }
  };

  const addBudget = async (budget) => {
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    });

    fetchBudgets();
  };

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <Navbar>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border w-22 text-sm md:text-lg md:w-40 md:px-4 rounded"
        />
      </Navbar>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RightSide>
          <DashboardSummary transactions={transactions} />
          <InputForms>
            <TransactionForm onAddTransaction={addTransaction} />
            <BudgetForm onAddBudget={addBudget} />
          </InputForms>
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
            onEditTransaction={editTransaction}
          />
          <SpendingInsights
            transactions={transactions}
            budgets={budgets}
            selectedMonth={selectedMonth}
          />
        </RightSide>

        <LeftSide>
          <MonthlyExpensesChart transactions={transactions} />
          <CategoryPieChart transactions={transactions} />
          <BudgetComparisonChart
            transactions={transactions}
            budgets={budgets}
            selectedMonth={selectedMonth}
          />
        </LeftSide>
      </div>

      <Toaster />
    </main>
  );
}

function InputForms({ children }) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-4">{children}</div>;
}

function RightSide({ children }) {
  return <div className="flex flex-col">{children}</div>;
}

function LeftSide({ children }) {
  return <div className="flex flex-col">{children}</div>;
}
