
import mongoose from "mongoose";

import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";

// Get date range for a month
const getMonthRange = (year, month) => {
  return {
    start: new Date(Date.UTC(year, month, 1)),
    end: new Date(Date.UTC(year, month + 1, 1)),
  };
};

// GET DASHBOARD DATA
export const getDashboard = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(
      req.user._id
    );

    const now = new Date();

    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth();

    const currentRange = getMonthRange(
      currentYear,
      currentMonth
    );

    // 1. Calculate overall income and expenses
    const overallSummary = await Transaction.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;

    overallSummary.forEach((item) => {
      if (item._id === "income") {
        totalIncome = item.total;
      }

      if (item._id === "expense") {
        totalExpenses = item.total;
      }
    });

    const totalBalance = totalIncome - totalExpenses;

    // 2. Current month summary
    const monthlySummary = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: currentRange.start,
            $lt: currentRange.end,
          },
        },
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    let monthlyIncome = 0;
    let monthlyExpenses = 0;

    monthlySummary.forEach((item) => {
      if (item._id === "income") {
        monthlyIncome = item.total;
      }

      if (item._id === "expense") {
        monthlyExpenses = item.total;
      }
    });

    const monthlySavings = monthlyIncome - monthlyExpenses;

    const savingsRate =
      monthlyIncome > 0
        ? Number(
            ((monthlySavings / monthlyIncome) * 100).toFixed(2)
          )
        : 0;

    // 3. Last 6 months income vs expenses
    const chartStart = new Date(
      Date.UTC(currentYear, currentMonth - 5, 1)
    );

    const monthlyChart = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: chartStart,
            $lt: currentRange.end,
          },
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$date",
            },
            month: {
              $month: "$date",
            },
            type: "$type",
          },
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const chartMap = {};

    monthlyChart.forEach((item) => {
      const key = `${item._id.year}-${String(
        item._id.month
      ).padStart(2, "0")}`;

      if (!chartMap[key]) {
        chartMap[key] = {
          month: key,
          income: 0,
          expense: 0,
        };
      }

      chartMap[key][item._id.type] = item.total;
    });

    const incomeExpenseChart = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        Date.UTC(currentYear, currentMonth - i, 1)
      );

      const key = date.toISOString().slice(0, 7);

      incomeExpenseChart.push(
        chartMap[key] || {
          month: key,
          income: 0,
          expense: 0,
        }
      );
    }

    // 4. Expense category breakdown for current month
    const categoryBreakdown = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
          date: {
            $gte: currentRange.start,
            $lt: currentRange.end,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    // 5. Recent transactions
    const recentTransactions = await Transaction.find({
      user: req.user._id,
    })
      .sort({ date: -1, createdAt: -1 })
      .limit(5)
      .lean();

    // 6. Current month budget overview
    const currentMonthKey = now
      .toISOString()
      .slice(0, 7);

    const budgets = await Budget.find({
      user: req.user._id,
      month: currentMonthKey,
    }).lean();

    const budgetOverview = await Promise.all(
      budgets.map(async (budget) => {
        const spentResult = await Transaction.aggregate([
          {
            $match: {
              user: userId,
              type: "expense",
              category: budget.category,
              date: {
                $gte: currentRange.start,
                $lt: currentRange.end,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: "$amount",
              },
            },
          },
        ]);

        const spent = spentResult[0]?.total || 0;

        const percentage = Number(
          ((spent / budget.limit) * 100).toFixed(1)
        );

        return {
          category: budget.category,
          limit: budget.limit,
          spent,
          remaining: Math.max(
            budget.limit - spent,
            0
          ),
          percentage,
          progress: Math.min(percentage, 100),
          status:
            spent > budget.limit
              ? "exceeded"
              : percentage >= 80
                ? "warning"
                : "on_track",
        };
      })
    );

    // 7. Final dashboard response
    return res.status(200).json({
      success: true,

      summary: {
        totalBalance,
        totalIncome,
        totalExpenses,
        monthlyIncome,
        monthlyExpenses,
        monthlySavings,
        savingsRate,
      },

      incomeExpenseChart,

      categoryBreakdown: categoryBreakdown.map(
        (item) => ({
          category: item._id,
          amount: item.total,
        })
      ),

      recentTransactions,

      budgetOverview,
    });

  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};
