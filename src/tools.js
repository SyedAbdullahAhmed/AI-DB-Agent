import { Transaction } from "./schema.js";
import { connectDB } from "./conn.js";

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

    console.log(`Total balance: ${total}`);
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
    console.log(`Total expense: ${total}`);
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
    console.log(`Total income: ${total}`);
    return `${total}`;
  } catch (error) {
    console.error('Error calculating total income:', error);
    throw error;
  }
}

async function addExpense({ amount, purpose }) {
  try {
    const totalBalance = await getTotalAmount();
    if (+totalBalance <= 0) {
      return "You have no money to buy something";
    }
    const expense = await Transaction.create({
      type: "deduct",
      amount: Number(amount),
      purpose
    });
    if (!expense) {
      return 'Add failed'
    }
    console.log("Expense added");
    console.log(expense)
    return 'Added to the database.';
  } catch (error) {
      console.log("Error adding expense:");
      console.log(error);
  }
}

async function addIncome({ amount, purpose }) {
  try {
    const income = await Transaction.create({
      type: "add",
      amount: Number(amount),
      purpose
    });
    if (!income) {
      return 'Add failed'
    }
    console.log("Income added");
    console.log(income)
    return 'Added to the database.';
  } catch (error) {
    console.log("Error adding income:");
      console.log(error);
  }
}

export {
  getTotalAmount,
  getTotalExpense,
  getTotalIncome,
  addExpense,
  addIncome
};
