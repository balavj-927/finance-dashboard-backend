const User = require("./user.model");
const ApiError = require("../../utils/ApiError");

const getAllUsers = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const total = await User.countDocuments();
  const users = await User.find().skip(skip).limit(limit).sort({ createdAt: -1 });

  return {
    users,
    pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
  };
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found.");
  return user;
};

const updateUserRole = async (id, role) => {
  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, "User not found.");
  return user;
};

const updateUserStatus = async (id, isActive) => {
  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });
  if (!user) throw new ApiError(404, "User not found.");
  return user;
};

const deleteUser = async (id, requestingUserId) => {
  if (id === requestingUserId.toString()) {
    throw new ApiError(400, "You cannot delete your own account.");
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError(404, "User not found.");
  return { message: "User deleted successfully." };
};

module.exports = { getAllUsers, getUserById, updateUserRole, updateUserStatus, deleteUser };