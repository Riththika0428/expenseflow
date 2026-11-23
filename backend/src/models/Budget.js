
import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    limit: {
      type: Number,
      required: true,
      min: [0.01, "Budget limit must be greater than zero"],
    },

    month: {
      type: String,
      required: true,
      match: [
        /^\d{4}-(0[1-9]|1[0-2])$/,
        "Month must use YYYY-MM format",
      ],
    },
  },
  {
    timestamps: true,
  }
);

// One budget per category per month for each user
budgetSchema.index(
  { user: 1, category: 1, month: 1 },
  { unique: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
