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

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Stop the app if connection fails
  }
};


export {
  Transaction, connectDB
}
