const userService = require("./user.service");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const getAllUsers = asyncHandler(async (req, res) => {
  const result = await userService.getAllUsers(req.query);
  res.status(200).json(new ApiResponse(200, result, "Users fetched successfully"));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

const updateUserRole = asyncHandler(async (req, res) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role);
  res.status(200).json(new ApiResponse(200, user, "Role updated successfully"));
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body.isActive);
  res.status(200).json(new ApiResponse(200, user, "Status updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, "User deleted successfully"));
});

module.exports = { getAllUsers, getUserById, updateUserRole, updateUserStatus, deleteUser };