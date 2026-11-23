
import mongoose from "mongoose";
import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";
import Category from "../models/Category.js";

// Get current month in YYYY-MM format
const getCurrentMonth = () => {
  return new Date().toISOString().slice(0, 7);
};

// Validate and convert YYYY-MM into date range
const getMonthRange = (month) => {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    return null;
  }

  const [year, monthNumber] = month.split("-").map(Number);

  return {
    start: new Date(Date.UTC(year, monthNumber - 1, 1)),
    end: new Date(Date.UTC(year, monthNumber, 1)),
  };
};

// Check whether category belongs to the logged-in user
const validateExpenseCategory = async (userId, name) => {
  return Category.findOne({
    user: userId,
    name,
    type: "expense",
  });
};

// Calculate total expenses for each category in a month
const getSpentByCategory = async (userId, month) => {
  const range = getMonthRange(month);

  const results = await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        type: "expense",
        date: {
          $gte: range.start,
          $lt: range.end,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        spent: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const spentMap = {};

  results.forEach((item) => {
    spentMap[item._id] = item.spent;
  });

  return spentMap;
};

// Add calculated progress to a budget
const addBudgetProgress = (budget, spent = 0) => {
  const item = budget.toObject
    ? budget.toObject()
    : budget;

  const percentage = Number(
    ((spent / item.limit) * 100).toFixed(1)
  );

  let status = "on_track";

  if (spent > item.limit) {
    status = "exceeded";
  } else if (percentage >= 80) {
    status = "warning";
  }

  return {
    ...item,
    spent,
    remaining: Math.max(item.limit - spent, 0),
    overBy: Math.max(spent - item.limit, 0),
    percentage,
    progress: Math.min(percentage, 100),
    status,
  };
};


// CREATE BUDGET
export const createBudget = async (req, res) => {
  try {
    const { category, limit, month } = req.body;

    if (
      !category ||
      limit === undefined ||
      !month
    ) {
      return res.status(400).json({
        success: false,
        message: "Category, limit and month are required",
      });
    }

    const normalizedCategory = category.trim();
    const numericLimit = Number(limit);

    if (
      !normalizedCategory ||
      !Number.isFinite(numericLimit) ||
      numericLimit <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid category and budget limit",
      });
    }

    if (!getMonthRange(month)) {
      return res.status(400).json({
        success: false,
        message: "Invalid month. Use YYYY-MM format",
      });
    }

    const categoryExists = await validateExpenseCategory(
      req.user._id,
      normalizedCategory
    );

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Expense category not found",
      });
    }

    const budget = await Budget.create({
      user: req.user._id,
      category: normalizedCategory,
      limit: numericLimit,
      month,
    });

    const spentMap = await getSpentByCategory(
      req.user._id,
      month
    );

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget: addBudgetProgress(
        budget,
        spentMap[normalizedCategory] || 0
      ),
    });

  } catch (error) {
    console.error("Create budget:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Budget already exists for this category and month",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create budget",
    });
  }
};


// GET ALL BUDGETS
export const getBudgets = async (req, res) => {
  try {
    const month = req.query.month || getCurrentMonth();

    if (!getMonthRange(month)) {
      return res.status(400).json({
        success: false,
        message: "Invalid month. Use YYYY-MM format",
      });
    }

    const budgets = await Budget.find({
      user: req.user._id,
      month,
    }).sort({ category: 1 });

    const spentMap = await getSpentByCategory(
      req.user._id,
      month
    );

    const formattedBudgets = budgets.map((budget) =>
      addBudgetProgress(
        budget,
        spentMap[budget.category] || 0
      )
    );

    const totalBudget = formattedBudgets.reduce(
      (sum, item) => sum + item.limit,
      0
    );

    const totalSpent = formattedBudgets.reduce(
      (sum, item) => sum + item.spent,
      0
    );

    return res.status(200).json({
      success: true,
      month,
      count: formattedBudgets.length,
      summary: {
        totalBudget,
        totalSpent,
        remaining: totalBudget - totalSpent,
      },
      budgets: formattedBudgets,
    });

  } catch (error) {
    console.error("Get budgets:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch budgets",
    });
  }
};


// GET SINGLE BUDGET
export const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid budget ID",
      });
    }

    const budget = await Budget.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    const spentMap = await getSpentByCategory(
      req.user._id,
      budget.month
    );

    return res.status(200).json({
      success: true,
      budget: addBudgetProgress(
        budget,
        spentMap[budget.category] || 0
      ),
    });

  } catch (error) {
    console.error("Get budget:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch budget",
    });
  }
};


// UPDATE BUDGET
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid budget ID",
      });
    }

    const allowedFields = [
      "category",
      "limit",
      "month",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    if (updates.category !== undefined) {
      updates.category = updates.category.trim();

      if (!updates.category) {
        return res.status(400).json({
          success: false,
          message: "Category cannot be empty",
        });
      }

      const categoryExists = await validateExpenseCategory(
        req.user._id,
        updates.category
      );

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Expense category not found",
        });
      }
    }

    if (updates.limit !== undefined) {
      updates.limit = Number(updates.limit);

      if (
        !Number.isFinite(updates.limit) ||
        updates.limit <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Budget limit must be greater than zero",
        });
      }
    }

    if (
      updates.month !== undefined &&
      !getMonthRange(updates.month)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid month. Use YYYY-MM format",
      });
    }

    const budget = await Budget.findOneAndUpdate(
      {
        _id: id,
        user: req.user._id,
      },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    const spentMap = await getSpentByCategory(
      req.user._id,
      budget.month
    );

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      budget: addBudgetProgress(
        budget,
        spentMap[budget.category] || 0
      ),
    });

  } catch (error) {
    console.error("Update budget:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A budget already exists for this category and month",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update budget",
    });
  }
};


// DELETE BUDGET
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid budget ID",
      });
    }

    const budget = await Budget.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });

  } catch (error) {
    console.error("Delete budget:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete budget",
    });
  }
};
