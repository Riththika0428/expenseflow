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
      default: "Circle",
    },

    color: {
      type: String,
      default: "#5145CD",
      match: /^#[0-9A-Fa-f]{6}$/,
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

// A user cannot create duplicate category names of the same type.
categorySchema.index(
  { user: 1, name: 1, type: 1 },
  { unique: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;