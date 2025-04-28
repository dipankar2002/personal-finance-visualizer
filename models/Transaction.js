import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: String,
}, {
  timestamps: true,
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
