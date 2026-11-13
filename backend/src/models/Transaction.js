
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Transaction title is required"],
      trim: true,
      maxlength: 100,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [0.01, "Amount must be greater than zero"],
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    paymentMethod: {
      type: String,
      enum: [
        "cash",
        "card",
        "bank_transfer",
        "online",
        "other",
      ],
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

// Efficient user transaction history queries
transactionSchema.index({
  user: 1,
  date: -1,
});

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);

export default Transaction;
