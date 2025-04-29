import Budget from "../../../models/Budget";
import connectDB from "../../../lib/mongodb";

export async function GET(req) {
  await connectDB();
  const budgets = await Budget.find();
  return Response.json(budgets);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const { category, month, amount } = data;

  if (!category || !month || amount == null) {
    return Response.json({ message: "Missing fields" }, { status: 400 });
  }

  const existingBudget = await Budget.findOne({ category, month });

  if (existingBudget) {
    existingBudget.amount = amount;
    await existingBudget.save();
    return Response.json({ message: "Budget updated!" });
  } else {
    const newBudget = new Budget({ category, month, amount });
    await newBudget.save();
    return Response.json({ message: "Budget saved!" });
  }
}
