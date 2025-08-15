import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0 // ensures amount can't be negative
  },
  type: {
    type: String,
    enum: ['add', 'deduct'], // only allow these two values
    required: true
  },
  purpose: {
    type: String,
    required: true,
    trim: true // remove extra spaces
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction=  mongoose.model('Transaction', transactionSchema);


export {
  Transaction
}
