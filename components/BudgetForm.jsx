"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import categories from "../utils/categoriesObj";

export default function BudgetForm({ onAddBudget }) {
  const [category, setCategory] = useState(categories[0]);
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount.trim() || !month.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const budgetData = {
      category,
      amount: parseFloat(amount),
      month,
    };

    onAddBudget(budgetData);

    setAmount("");
    setMonth("");
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-lg font-semibold mb-2">Set Budget</h2>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 w-full rounded"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-4 py-2 w-full rounded"
        min="0"
        step="0.01"
      />

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border px-4 py-2 w-full rounded"
      />

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold p-2 w-full rounded"
      >
        Save Budget
      </button>
    </form>
  );
}
