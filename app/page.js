"use client";

import { useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionList from "../components/TransactionList.jsx";
import MonthlyExpensesChart from "@/components/MonthlyExpensesChart.jsx";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (txn) => {
    setTransactions([...transactions, txn]);
  };

  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  };

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer</h1>
      <TransactionForm onAddTransaction={addTransaction} />
      <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
      <MonthlyExpensesChart transactions={transactions} />
    </main>
  );
}
