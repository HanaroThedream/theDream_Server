const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

//로그인 입력 처리
router.post("/login", userController.postUserLogIn);
router.post("/signup", userController.postUserSignUp);

module.exports = router;
