const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const {
  getAllUsers, getUserById, updateUserRole, updateUserStatus, deleteUser,
} = require("./user.controller");

router.use(protect, authorize("admin"));

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id/role", [body("role").isIn(["viewer", "analyst", "admin"]).withMessage("Invalid role")], updateUserRole);
router.patch("/:id/status", [body("isActive").isBoolean().withMessage("isActive must be boolean")], updateUserStatus);
router.delete("/:id", deleteUser);

module.exports = router;