"use client";

import { useState } from "react";

export default function TransactionList({ transactions, onDeleteTransaction, onEditTransaction }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [updateTxn, setUpdateTxn] = useState(transactions[editingIndex] || {});

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="space-y-2 h-[350px] border border-gray-300 rounded p-4 overflow-auto ">
          {transactions.map((txn, index) => (
            <li
              key={index}
              className="flex flex-col border rounded px-4 py-2 space-y-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">
                    {txn.description} ({txn.category})
                  </p>
                  <small>
                    <span className="text-red-500 text-lg font-semibold">${txn.amount}</span> - <span className="text-gray-600">{txn.date}</span>
                  </small>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setEditingIndex(editingIndex === index ? null : index)
                    }
                    className="text-blue-500 hover:underline p-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTransaction(index)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingIndex === index && 
                <EditTransaction txn={txn}>
                  <input
                    type="text"
                    placeholder="Edit description"
                    defaultValue={txn.description}
                    onChange={(e) => setUpdateTxn({ ...updateTxn, description: e.target.value })}
                    className="border px-2 py-1 rounded w-full mb-2"
                  />
                  <input
                    type="number"
                    placeholder="Edit amount"
                    defaultValue={txn.amount}
                    onChange={(e) => setUpdateTxn({ ...updateTxn, amount: e.target.value })}
                    className="border px-2 py-1 rounded w-full mb-2"
                  />
                  <button 
                    className="bg-green-500 text-white px-2 rounded"
                    onClick={() => {
                      onEditTransaction(index, updateTxn);
                      setEditingIndex(null);
                    }}
                  >
                    Update
                  </button>
                </EditTransaction>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EditTransaction({ children }) {
  return (
    <div>
      { children } 
    </div>
  )
}
