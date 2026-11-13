
import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// All transaction routes require authentication
router.use(protect);

// GET all transactions
router.get("/", getTransactions);

// CREATE transaction
router.post("/", createTransaction);

// GET one transaction
router.get("/:id", getTransactionById);

// UPDATE transaction
router.patch("/:id", updateTransaction);

// DELETE transaction
router.delete("/:id", deleteTransaction);

export default router;
