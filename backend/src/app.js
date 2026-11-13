import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());


// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ExpenseFlow API is running successfully!",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

export default app;