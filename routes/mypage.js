const express = require("express");
const router = express.Router();

const mypageController = require("../controller/mypageController");

router.post("/checkPassword", mypageController.postCheckPassword);
router.get("/", mypageController.getMypage);
//router.put("/updateInfo", mypageController.putUpdateInfo);
//router.get("/myWritten", mypageController.getMyWritten);

module.exports = router;
