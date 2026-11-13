
import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// All category endpoints require authentication
router.use(protect);

router
  .route("/")
  .get(getCategories)
  .post(createCategory);

router
  .route("/:id")
  .patch(updateCategory)
  .delete(deleteCategory);

export default router;
