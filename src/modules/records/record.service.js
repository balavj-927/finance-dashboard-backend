const Record = require("./record.model");
const ApiError = require("../../utils/ApiError");

const createRecord = async (data, userId) => {
  const record = await Record.create({ ...data, createdBy: userId });
  return record;
};

const getAllRecords = async (filters, { page = 1, limit = 10 }) => {
  const query = {};

  if (filters.type) query.type = filters.type;
  if (filters.category) query.category = filters.category;
  if (filters.startDate || filters.endDate) {
    query.date = {};
    if (filters.startDate) query.date.$gte = new Date(filters.startDate);
    if (filters.endDate) query.date.$lte = new Date(filters.endDate);
  }

  const skip = (page - 1) * limit;
  const total = await Record.countDocuments(query);
  const records = await Record.find(query)
    .populate("createdBy", "name email")
    .sort({ date: -1 })
    .skip(skip)
    .limit(Number(limit));

  return {
    records,
    pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
  };
};

const getRecordById = async (id) => {
  const record = await Record.findById(id).populate("createdBy", "name email");
  if (!record) throw new ApiError(404, "Record not found.");
  return record;
};

const updateRecord = async (id, data) => {
  const record = await Record.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!record) throw new ApiError(404, "Record not found.");
  return record;
};

const deleteRecord = async (id) => {
  const record = await Record.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!record) throw new ApiError(404, "Record not found.");
  return { message: "Record deleted successfully." };
};

module.exports = { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord };