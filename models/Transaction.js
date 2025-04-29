import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: String,
  category: String,
}, {
  timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
