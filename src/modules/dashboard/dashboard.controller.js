const dashboardService = require("./dashboard.service");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getSummary = asyncHandler(async (req, res) => {
  const data = await dashboardService.getSummary();
  res.status(200).json(new ApiResponse(200, data, "Summary fetched successfully"));
});

const getCategoryBreakdown = asyncHandler(async (req, res) => {
  const data = await dashboardService.getCategoryBreakdown();
  res.status(200).json(new ApiResponse(200, data, "Category breakdown fetched"));
});

const getMonthlyTrends = asyncHandler(async (req, res) => {
  const data = await dashboardService.getMonthlyTrends(req.query.year);
  res.status(200).json(new ApiResponse(200, data, "Monthly trends fetched"));
});

const getRecentActivity = asyncHandler(async (req, res) => {
  const data = await dashboardService.getRecentActivity(req.query.limit);
  res.status(200).json(new ApiResponse(200, data, "Recent activity fetched"));
});

module.exports = { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentActivity };