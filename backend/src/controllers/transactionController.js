
import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";

// CREATE TRANSACTION
export const createTransaction = async (req, res) => {
  try {
    const {
      title,
      type,
      amount,
      category,
      date,
      description,
      paymentMethod,
    } = req.body;

    if (!title || !type || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type",
      });
    }

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    if (date && Number.isNaN(Date.parse(date))) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction date",
      });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      type,
      amount: Number(amount),
      category,
      date: date || Date.now(),
      description,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
};


// GET ALL TRANSACTIONS
export const getTransactions = async (req, res) => {
  try {
    const {
      type,
      category,
      search,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    // Always restrict queries to the logged-in user
    const filter = {
      user: req.user._id,
    };

    if (type && ["income", "expense"].includes(type)) {
      filter.type = type;
    } else if (type) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type filter",
      });
    }

    if (category) {
      filter.category = category;
    }

    if (search) {
      const safeSearch = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { category: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        const start = new Date(startDate);

        if (Number.isNaN(start.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid start date",
          });
        }

        filter.date.$gte = start;
      }

      if (endDate) {
        const end = new Date(endDate);

        if (Number.isNaN(end.getTime())) {
          return res.status(400).json({
            success: false,
            message: "Invalid end date",
          });
        }

        // Include the entire end date
        end.setUTCHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    const currentPage = Math.max(1, Number(page) || 1);
    const perPage = Math.min(
      100,
      Math.max(1, Number(limit) || 10)
    );

    const skip = (currentPage - 1) * perPage;

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .sort({ date: -1 })
        .skip(skip)
        .limit(perPage),

      Transaction.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      page: currentPage,
      totalPages: Math.ceil(total / perPage),
      transactions,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};


// GET SINGLE TRANSACTION
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const transaction = await Transaction.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction",
    });
  }
};


// UPDATE TRANSACTION
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const allowedFields = [
      "title",
      "type",
      "amount",
      "category",
      "date",
      "description",
      "paymentMethod",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.type && !["income", "expense"].includes(updates.type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction type",
      });
    }

    if (
      updates.amount !== undefined &&
      (!Number.isFinite(Number(updates.amount)) ||
        Number(updates.amount) <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than zero",
      });
    }

    if (updates.amount !== undefined) {
      updates.amount = Number(updates.amount);
    }

    if (updates.date && Number.isNaN(Date.parse(updates.date))) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction date",
      });
    }

    const transaction = await Transaction.findOneAndUpdate(
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

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update transaction",
    });
  }
};


// DELETE TRANSACTION
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
    });
  }
};
