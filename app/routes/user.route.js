const express = require("express");
const userLogin = require("../controller/user/userLogin");
const {
  userLoginValidation, userRegisterValidation,
} = require("../../service/validation/userValidation");
const bodyErrorSender = require("../middleware/bodyErrorSender");
const userRegister = require("../controller/user/userRegister");

const userRoute = express.Router();

userRoute.post("/login", userLoginValidation, bodyErrorSender, userLogin);
userRoute.post("/register", userRegisterValidation, bodyErrorSender,userRegister);

module.exports = userRoute;
