"use client";

export default function SpendingInsights({ transactions, budgets, selectedMonth }) {
  const monthlyTransactions = transactions.filter((txn) =>
    txn.date.startsWith(selectedMonth)
  );

  const actualSpending = monthlyTransactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {});

  const insights = budgets
    .filter((b) => b.month === selectedMonth)
    .map((b) => {
      const spent = actualSpending[b.category] || 0;
      const status = spent > b.amount ? "Over Budget 🚨" : "Within Budget ✅";
      return {
        category: b.category,
        budget: b.amount,
        spent,
        status,
      };
    });

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="border p-2 rounded">
            {insight.category}: Spent ${insight.spent} / Budget ${insight.budget} - {insight.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
