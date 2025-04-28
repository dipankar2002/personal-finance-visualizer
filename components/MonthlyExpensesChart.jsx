"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyExpensesChart({ transactions }) {
  const data = transactions.map((txn) => ({
    date: new Date(txn.date).toLocaleDateString("en-US", { month: "short" }),
    amount: txn.amount,
  }));

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
