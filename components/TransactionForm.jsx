"use client";

import { useState } from "react";

export default function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      alert("Please fill all fields");
      return;
    }
    onAddTransaction({ description, amount: parseFloat(amount), date });
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Transaction
      </button>
    </form>
  );
}
