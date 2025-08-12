import { Transaction, connectDB } from "./schema.js";

connectDB()
async function getTotalAmount() {
  try {
    const transactions = await Transaction.find();
    
    const total = transactions.reduce((acc, tx) => {
      return acc + (tx.type === 'add' ? tx.amount : -tx.amount);
    }, 0);
     if (total <= 0) {
      return "Account balance is 0"
    }
    return `${total}`;
  } catch (error) {
    console.error('Error calculating money balance:', error);
    throw error;
  }
}

async function getTotalExpense() {
  try {
    const transactions = await Transaction.find({ type: "deduct" });
    if(transactions.length === 0) {
      return "There is no expense recorded"
    }
    const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
     if (total <= 0) {
      return "Account balance is 0"
    }
    return `${total}`;
  } catch (error) {
    console.error('Error calculating total expense:', error);
    throw error;
  }
}

async function getTotalIncome() {
  try {
    const transactions = await Transaction.find({ type: "add" });
     if(transactions.length === 0) {
      return "There is no income recorded"
    }
    const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
    if (total <= 0) {
      return "Account balance is 0"
    }
    return `${total}`;
  } catch (error) {
    console.error('Error calculating total income:', error);
    throw error;
  }
}

async function addExpense({ amount, purpose }) {
  const totalBalance = await getTotalAmount();
  if (+totalBalance <= 0) {
    return "You have no money to buy something";
  }
  const expense = await Transaction.create({
    type: "deduct",
    amount,
    purpose
  });
  if (!expense) {
    return 'Add failed'
  }
  return 'Added to the database.';
}

async function addIncome({ amount, purpose }) {
  const income = await Transaction.create({
    type: "add",
    amount,
    purpose
  });
  if (!income) {
    return 'Add failed'
  }
  return 'Added to the database.';
}

export {
  getTotalAmount,
  getTotalExpense,
  getTotalIncome,
  addExpense,
  addIncome
};
