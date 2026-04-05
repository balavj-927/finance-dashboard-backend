const recordService = require("./record.service");
const ApiResponse = require("../../utils/ApiResponse");
const asyncHandler = require("../../utils/asyncHandler");
const { validationResult } = require("express-validator");
const ApiError = require("../../utils/ApiError");

const createRecord = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, "Validation failed", errors.array());
  const record = await recordService.createRecord(req.body, req.user._id);
  res.status(201).json(new ApiResponse(201, record, "Record created successfully"));
});

const getAllRecords = asyncHandler(async (req, res) => {
  const { page, limit, ...filters } = req.query;
  const result = await recordService.getAllRecords(filters, { page, limit });
  res.status(200).json(new ApiResponse(200, result, "Records fetched successfully"));
});

const getRecordById = asyncHandler(async (req, res) => {
  const record = await recordService.getRecordById(req.params.id);
  res.status(200).json(new ApiResponse(200, record, "Record fetched successfully"));
});

const updateRecord = asyncHandler(async (req, res) => {
  const record = await recordService.updateRecord(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, record, "Record updated successfully"));
});

const deleteRecord = asyncHandler(async (req, res) => {
  const result = await recordService.deleteRecord(req.params.id);
  res.status(200).json(new ApiResponse(200, result, "Record deleted successfully"));
});

module.exports = { createRecord, getAllRecords, getRecordById, updateRecord, deleteRecord };