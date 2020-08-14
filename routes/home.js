const express = require("express");
const router = express.Router();
const path = require("path");
const { builtinModules } = require("module");

router.get("/", function (req, res, next) {
  //res.send("wecome, " + req.session.pnum + "!");
  res.sendFile(path.join(__dirname, "../", "public", "home.html"));
});

module.exports = router;
