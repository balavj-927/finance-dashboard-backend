const jwt=require("jsonwebtoken");
const User=require("../modules/users/user.model");
const ApiError=require("../utils/ApiError");
const asyncHandler=require("../utils/asyncHandler");
const protect=asyncHandler(async (req,res,next)=>{
  let token;
  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    token=req.headers.authorization.split(" ")[1];
  }
  if(!token){
    throw new ApiError(401, "Access denied. No token provided.");
  }
  const decoded=jwt.verify(token, process.env.JWT_SECRET);
  const user=await User.findById(decoded.id);
  if(!user){
    throw new ApiError(401, "User no longer exists.");
  }
  if(!user.isActive){
    throw new ApiError(403, "Your account has been deactivated.");
  }
  req.user=user;
  next();
});
module.exports={protect};