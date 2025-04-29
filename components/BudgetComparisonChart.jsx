"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BudgetComparisonChart({ transactions = [], budgets = [], selectedMonth = "" }) {
  if (!budgets.length || !selectedMonth) {
    return <div className="text-center text-gray-500">No budgets found for this month.</div>;
  }

  const monthlyTransactions = transactions.filter((txn) =>
    txn.date?.startsWith(selectedMonth)
  );

  const actualSpending = monthlyTransactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const chartData = budgets
    .filter((b) => b.month === selectedMonth)
    .map((b) => ({
      category: b.category,
      Budget: b.amount,
      Actual: actualSpending[b.category] || 0,
    }));

  if (!chartData.length) {
    return <div className="text-center text-gray-500">No spending data for this month.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Budget vs Actual ({selectedMonth})
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#60B5FF" />
          <Bar dataKey="Actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
