import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET(request) {
  await dbConnect();
  const transactions = await Transaction.find();
  return Response.json(transactions);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const transaction = await Transaction.create(body);
  return Response.json(transaction);
}

export async function PUT(request) {
  await dbConnect();
  const { id, ...body } = await request.json();
  const transaction = await Transaction.findByIdAndUpdate(id, body, {
    new: true,
  });
  return Response.json(transaction);
}

export async function DELETE(request) {
  await dbConnect();
  const { id } = await request.json();
  const transaction = await Transaction.findByIdAndDelete(id);
  return Response.json(transaction);
}
