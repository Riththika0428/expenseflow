import mongoose from "mongoose";
import Category from "../models/Category.js";
import Transaction from "../models/Transaction.js";

// Create category
export const createCategory = async (req, res) => {
  try {
    const {
      name,
      type,
      icon,
      color,
      description,
    } = req.body;

    if (!name?.trim() || !type) {
      return res.status(400).json({
        success: false,
        message: "Category name and type are required",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category type",
      });
    }

    const category = await Category.create({
      user: req.user._id,
      name: name.trim(),
      type,
      icon,
      color,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This category already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create category error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create category",
    });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const { type, search } = req.query;

    const filter = {
      user: req.user._id,
    };

    if (type) {
      if (!["income", "expense"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category type",
        });
      }

      filter.type = type;
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const categories = await Category.find(filter).sort({
      type: 1,
      name: 1,
    });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve categories",
    });
  }
};

// Get single category
export const getCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get category error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve category",
    });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const allowedFields = [
      "name",
      "type",
      "icon",
      "color",
      "description",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (
      updates.name !== undefined &&
      (typeof updates.name !== "string" || !updates.name.trim())
    ) {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty",
      });
    }

    if (updates.name) {
      updates.name = updates.name.trim();
    }

    if (
      updates.type !== undefined &&
      !["income", "expense"].includes(updates.type)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid category type",
      });
    }

    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        isDefault: false,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found or cannot be modified",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This category already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update category error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update category",
    });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (category.isDefault) {
      return res.status(403).json({
        success: false,
        message: "Default categories cannot be deleted",
      });
    }

    const transactionExists = await Transaction.exists({
      user: req.user._id,
      category: category.name,
    });

    if (transactionExists) {
      return res.status(409).json({
        success: false,
        message: "This category is being used by transactions",
      });
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to delete category",
    });
  }
};