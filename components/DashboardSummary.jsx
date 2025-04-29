"use client";

import categoriesObj from "@/utils/categoriesObj";
import { useState } from "react";

export default function DashboardSummary({ transactions }) {
  const [category, setCategory] = useState(categoriesObj[0]);

  const totalExpense = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  const recentTransactions = transactions
    .sort((b, a) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  const filteredTransactions = transactions.filter(
    (txn) => txn.category === category
  );

  return (
    <div className="my-8 grid grid-cols-[100%] lg:grid-cols-[40%_60%] gap-2">
      <div className="px-4 py-2 border rounded shadow lg:w-[95%]">
        <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
        <p className="text-4xl font-bold">${totalExpense.toFixed(2)}</p>
      </div>

      <div className="px-4 py-2 border rounded shadow lg:w-[96%]">
        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
        <ul className="text-sm mb-2">
          {recentTransactions.map((txn, index) => (
            <li key={index} className="font-medium flex items-center">
              <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] inline-block mr-1">
                {txn.description}
              </span>
              <span>-</span>
              <span className="text-red-500 mx-1">${txn.amount}</span>
              <span>({txn.date})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2 px-4 py-2 lg:w-[97%] border rounded shadow">
        <div className="flex justify-start items-center mb-2">
          <h2 className="text-xl font-semibold mb-2 mr-3">Category Breakdown</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border text-sm rounded"
          >
            {categoriesObj.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <ul className="text-sm mb-2">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn, index) => (
              <li key={index} className="font-medium flex items-center">
                <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] inline-block mr-1">
                  {txn.description}
                </span>
                <span>-</span>
                <span className="text-red-500 mx-1">${txn.amount}</span>
                <span>({txn.date})</span>
              </li>
            ))
          ) : (
            <li>No Transactions</li>
          )}
        </ul>
      </div>
    </div>
  );
}
