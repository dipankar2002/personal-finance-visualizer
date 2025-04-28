"use client";

import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const addTransaction = async (txn) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(txn),
    });
    const newTxn = await res.json();
    setTransactions([...transactions, newTxn]);
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
