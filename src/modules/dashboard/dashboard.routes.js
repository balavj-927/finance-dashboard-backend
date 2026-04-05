const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const {
  getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentActivity,
} = require("./dashboard.controller");

// All dashboard routes require at least analyst role
router.use(protect, authorize("analyst", "admin"));

router.get("/summary", getSummary);
router.get("/categories", getCategoryBreakdown);
router.get("/trends", getMonthlyTrends);
router.get("/recent", getRecentActivity);

module.exports = router;