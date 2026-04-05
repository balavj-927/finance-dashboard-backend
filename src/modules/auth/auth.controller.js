const authService=require("./auth.service");
const ApiResponse=require("../../utils/ApiResponse");
const asyncHandler=require("../../utils/asyncHandler");
const {validationResult}=require("express-validator");
const ApiError=require("../../utils/ApiError");
const register=asyncHandler(async (req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    throw new ApiError(400, "Validation failed", errors.array());
  }
  const result=await authService.register(req.body);
  res.status(201).json(new ApiResponse(201, result, "Registration successful"));
});
const login=asyncHandler(async (req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    throw new ApiError(400, "Validation failed", errors.array());
  }

  const result=await authService.login(req.body);
  res.status(200).json(new ApiResponse(200, result, "Login successful"));
});
const getMe=asyncHandler(async (req,res)=>{
  res.status(200).json(new ApiResponse(200, req.user, "Profile fetched successfully"));
});
module.exports={ register, login, getMe };