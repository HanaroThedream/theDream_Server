const express = require("express");
const router = express.Router();

const homeController = require("../controller/homeController");

router.get("/", homeController.getHome);
router.get("/oath", homeController.getOath);
router.get("/scripture", homeController.getScriptures);
router.post("/attendance", homeController.postAttendance);

module.exports = router;
