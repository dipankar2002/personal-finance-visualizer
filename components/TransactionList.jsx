"use client";

export default function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Transaction List</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((txn, index) => (
            <li key={index} className="flex justify-between items-center border p-2">
              <div>
                <p>{txn.description}</p>
                <small>{txn.date} - ${txn.amount}</small>
              </div>
              <button
                onClick={() => onDeleteTransaction(index)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
