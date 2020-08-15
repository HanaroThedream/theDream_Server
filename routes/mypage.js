const express = require("express");
const router = express.Router();

const mypageController = require("../controller/mypageController");

router.post("/checkPassword", mypageController.postCheckPassword);
//router.get("/info");
//router.put("/info/update");

module.exports = router;
