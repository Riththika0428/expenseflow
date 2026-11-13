
import mongoose from "mongoose";
import Category from "../models/Category.js";
import { defaultCategories } from "../utils/defaultCategories.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const {
      name,
      type,
      icon,
      color,
      description,
    } = req.body;

    if (!name || !type) {
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

    const normalizedName = name.trim();

    if (!normalizedName) {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty",
      });
    }

    const existingCategory = await Category.findOne({
      user: req.user._id,
      name: normalizedName,
      type,
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "This category already exists",
      });
    }

    const category = await Category.create({
      user: req.user._id,
      name: normalizedName,
      type,
      icon,
      color,
      description,
      isDefault: false,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    console.error("Create category:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This category already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};


// GET ALL CATEGORIES
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
      const safeSearch = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.name = {
        $regex: safeSearch,
        $options: "i",
      };
    }

    const categories = await Category.find(filter)
      .sort({ type: 1, name: 1 });

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (error) {
    console.error("Get categories:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};


// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const allowedFields = [
      "name",
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

    if (updates.name !== undefined) {
      updates.name = updates.name.trim();

      if (!updates.name) {
        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }
    }

    const category = await Category.findOneAndUpdate(
      {
        _id: id,
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
        message: "Custom category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {
    console.error("Update category:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This category name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};


// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const category = await Category.findOneAndDelete({
      _id: id,
      user: req.user._id,
      isDefault: false,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Custom category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.error("Delete category:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};


// CREATE DEFAULT CATEGORIES
export const createDefaultCategories = async (userId) => {
  const categories = defaultCategories.map((category) => ({
    ...category,
    user: userId,
    isDefault: true,
  }));

  await Category.insertMany(categories, {
    ordered: false,
  });
};
