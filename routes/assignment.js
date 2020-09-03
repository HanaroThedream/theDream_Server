const express = require("express");
const router = express.Router();

const assignmentController = require("../controller/assignmentController");

router.get("/", assignmentController.getAssignment);
router.post("/submit", assignmentController.postSubmitAssignment);
router.get("/rank", assignmentController.getRank);

module.exports = router;
