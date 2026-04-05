const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const {
  createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord,
} = require("./record.controller");

const recordValidation = [
  body("amount").isFloat({ min: 0.01 }).withMessage("Amount must be a positive number"),
  body("type").isIn(["income", "expense"]).withMessage("Type must be income or expense"),
  body("category").notEmpty().withMessage("Category is required"),
  body("date").optional().isISO8601().withMessage("Date must be a valid ISO date"),
];

// All record routes require login
router.use(protect);

// Viewers and above can read
router.get("/", authorize("viewer", "analyst", "admin"), getAllRecords);
router.get("/:id", authorize("viewer", "analyst", "admin"), getRecordById);

// Only analyst and admin can create/update/delete
router.post("/", authorize("analyst", "admin"), recordValidation, createRecord);
router.put("/:id", authorize("analyst", "admin"), recordValidation, updateRecord);
router.delete("/:id", authorize("admin"), deleteRecord);

module.exports = router;