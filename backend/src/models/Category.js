
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: 50,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    icon: {
      type: String,
      default: "wallet",
    },

    color: {
      type: String,
      default: "#64748b",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate category names for the same user and type
categorySchema.index(
  { user: 1, name: 1, type: 1 },
  { unique: true }
);

const Category = mongoose.model(
  "Category",
  categorySchema
);

export default Category;
