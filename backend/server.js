import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`ExpenseFlow server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start ExpenseFlow:", error.message);
    process.exit(1);
  }
};

startServer();