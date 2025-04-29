"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import categories from "../utils/categoriesObj";

export default function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      toast.error("Please fill all fields");
      return;
    }
    onAddTransaction({ description, amount: parseFloat(amount), date, category });
    setDescription("");
    setAmount("");
    setDate("");
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-lg font-semibold mb-2">Make Transaction</h2>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-4 py-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-4 py-2 w-full rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-4 py-2 w-full rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 w-full rounded"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Transaction
      </button>
    </form>
  );
}
