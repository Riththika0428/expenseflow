import Transaction from "../models/Transaction.js";

const getAnalytics = async (req, res) => {
  try {
    const { year, startDate, endDate } = req.query;

    let rangeStart;
    let rangeEnd;

    // Use a custom date range when supplied.
    if (startDate || endDate) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (
        !startDate ||
        !endDate ||
        !datePattern.test(startDate) ||
        !datePattern.test(endDate)
      ) {
        return res.status(400).json({
          success: false,
          message: "Provide both dates in YYYY-MM-DD format.",
        });
      }

      rangeStart = new Date(`${startDate}T00:00:00.000Z`);
      rangeEnd = new Date(`${endDate}T00:00:00.000Z`);

      if (
        Number.isNaN(rangeStart.getTime()) ||
        Number.isNaN(rangeEnd.getTime()) ||
        rangeStart.toISOString().slice(0, 10) !== startDate ||
        rangeEnd.toISOString().slice(0, 10) !== endDate ||
        rangeStart > rangeEnd
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid date range.",
        });
      }

      // Include the entire end date.
      rangeEnd.setUTCDate(rangeEnd.getUTCDate() + 1);
    } else {
      const selectedYear = year
        ? Number(year)
        : new Date().getUTCFullYear();

      if (
        !Number.isInteger(selectedYear) ||
        selectedYear < 2000 ||
        selectedYear > 2100
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid year.",
        });
      }

      rangeStart = new Date(Date.UTC(selectedYear, 0, 1));
      rangeEnd = new Date(Date.UTC(selectedYear + 1, 0, 1));
    }

    const match = {
      user: req.user._id,
      date: {
        $gte: rangeStart,
        $lt: rangeEnd,
      },
    };

    // 1. Income and expense summary
    const summaryResult = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const income = summaryResult.find((item) => item._id === "income");
    const expense = summaryResult.find((item) => item._id === "expense");

    const totalIncome = income?.total || 0;
    const totalExpenses = expense?.total || 0;
    const savings = totalIncome - totalExpenses;

    // 2. Monthly income and expense trend
    const monthlyResult = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthlyTrend = [];

    let current = new Date(rangeStart);

    while (current < rangeEnd) {
      const month = current.getUTCMonth() + 1;
      const currentYear = current.getUTCFullYear();

      const incomeItem = monthlyResult.find(
        (item) =>
          item._id.year === currentYear &&
          item._id.month === month &&
          item._id.type === "income"
      );

      const expenseItem = monthlyResult.find(
        (item) =>
          item._id.year === currentYear &&
          item._id.month === month &&
          item._id.type === "expense"
      );

      const monthIncome = incomeItem?.total || 0;
      const monthExpenses = expenseItem?.total || 0;

      monthlyTrend.push({
        year: currentYear,
        month,
        income: monthIncome,
        expenses: monthExpenses,
        savings: monthIncome - monthExpenses,
      });

      current.setUTCMonth(current.getUTCMonth() + 1);
    }

    // 3. Expense category breakdown
    const categoryBreakdown = await Transaction.aggregate([
      {
        $match: {
          ...match,
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const formattedCategories = categoryBreakdown.map((item) => ({
      category: item._id || "Uncategorized",
      total: item.total,
      count: item.count,
      percentage:
        totalExpenses > 0
          ? Number(((item.total / totalExpenses) * 100).toFixed(2))
          : 0,
    }));

    // 4. Top five spending categories
    const topCategories = formattedCategories.slice(0, 5);

    // 5. Savings rate
    const savingsRate =
      totalIncome > 0
        ? Number(((savings / totalIncome) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      success: true,
      period: {
        startDate: rangeStart.toISOString(),
        endDate: new Date(rangeEnd.getTime() - 1).toISOString(),
      },
      summary: {
        totalIncome,
        totalExpenses,
        savings,
        savingsRate,
        incomeTransactions: income?.count || 0,
        expenseTransactions: expense?.count || 0,
      },
      monthlyTrend,
      categoryBreakdown: formattedCategories,
      topCategories,
    });
  } catch (error) {
    console.error("Analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate analytics.",
    });
  }
};

export { getAnalytics };