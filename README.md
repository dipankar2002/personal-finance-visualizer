# 💰 Personal Finance Visualizer

A simple web application for tracking personal expenses, visualizing spending, and managing budgets.  
Built using **React, Next.js, MongoDB, Recharts**.

---

## Live Demo

 [https://personal-finance-visualizer-red-pi.vercel.app/]

---

## Features

### Stage 1 – Transaction Tracker
- Add, edit, and delete transactions (amount, date, description)
- View transaction list
- Monthly expense bar chart
- Basic form validation

### Stage 2 – Categories & Summary
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards: total expenses, breakdown, and recent activity

### Stage 3 – Budgeting
- Set monthly budgets by category
- Budget vs actual comparison chart
- Simple insights for overspending and budgeting gaps

---

## Tech Stack

- **Frontend**: React, Next.js, Tailwind Css
- **Backend**: Next.js API routes
- **Charts**: Recharts
- **Database**: MongoDB Atlas

---

## Installation
Follow these steps to set up the project locally:

### Step 1: Clone the Repository

git clone https://github.com/yourusername/personal-finance-visualizer.git
cd personal-finance-visualizer

### Step 2: Install Dependencies

npm install

### Step 3: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Add a user and whitelist your IP
4. Create a database (e.g., finance)
5. Copy your MongoDB connection URI

It looks like:

mongodb+srv://<username>:<password>@cluster0.mongodb.net/finance?retryWrites=true&w=majority

### Step 4: Configure Environment Variables

Create a file called `.env.local` in the root of the project:

MONGODB_URI=your-mongodb-uri-here

> Make sure this file is NOT pushed to GitHub.

### Step 5: Start the Development Server

npm run dev

Visit http://localhost:3000 to use the app locally.

---

## Folder Structure

/app
  /api           → API routes
  /components    → Reusable UI components
  page.tsx       → Dashboard
/models          → Mongoose schemas
/utils           → MongoDB connection helper
/public          → Static assets
.env.local       → Environment variables

---
