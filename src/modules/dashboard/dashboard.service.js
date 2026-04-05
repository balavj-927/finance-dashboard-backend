const Record = require("../records/record.model");

const getSummary = async () => {
  const summary = await Record.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
  ]);

  let totalIncome = 0, totalExpenses = 0, incomeCount = 0, expenseCount = 0;
  summary.forEach((item) => {
    if (item._id === "income") { totalIncome = item.total; incomeCount = item.count; }
    if (item._id === "expense") { totalExpenses = item.total; expenseCount = item.count; }
  });

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    incomeCount,
    expenseCount,
    totalRecords: incomeCount + expenseCount,
  };
};

const getCategoryBreakdown = async () => {
  return await Record.aggregate([
    { $match: { isDeleted: { $ne: true } } },
    {
      $group: {
        _id: { category: "$category", type: "$type" },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { total: -1 } },
    {
      $group: {
        _id: "$_id.category",
        breakdown: { $push: { type: "$_id.type", total: "$total", count: "$count" } },
        categoryTotal: { $sum: "$total" },
      },
    },
    { $sort: { categoryTotal: -1 } },
  ]);
};

const getMonthlyTrends = async (year) => {
  const matchYear = year ? { $expr: { $eq: [{ $year: "$date" }, Number(year)] } } : {};

  return await Record.aggregate([
    { $match: { isDeleted: { $ne: true }, ...matchYear } },
    {
      $group: {
        _id: { month: { $month: "$date" }, year: { $year: "$date" }, type: "$type" },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
};

const getRecentActivity = async (limit = 5) => {
  return await Record.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 })
    .limit(Number(limit));
};

module.exports = { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentActivity };