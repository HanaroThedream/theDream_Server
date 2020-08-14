const express = require("express");
const router = express.Router();
const path = require("path");
const { route } = require("./user");
const mysql = require("mysql");

const dbconfig = require("../config/dbconfig");
const mysqlConnection = mysql.createConnection(dbconfig);

const mypageController = require("../controller/mypageController");
//
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../", "public", "mypage.html"));
});

router.get("/checkPassword", function (req, res, next) {
  res.send(`
    <form action="/mypage/checkPassword" method="post">
    <h3>password</h3>
    <p><input type="text" name="password" placeholder="비밀번호" /></p>
    <input type="submit"/>
    </form>`);
});

router.post("/checkPassword", function (req, res, next) {
  var inputPassword = req.body.password;
  var sessionPnum = req.session.pnum;
  var dbPassword = "";

  mysqlConnection.query(
    `SELECT password FROM Saint WHERE pnumber = '${sessionPnum}';`,
    (err, rows) => {
      dbPassword = rows[0].password;

      if (inputPassword !== dbPassword) {
        console.log("incorrect pw");
        res.redirect("/mypage");
      } else if (inputPassword === dbPassword) {
        console.log("correct pw");
        res.redirect("/mypage/profileUpdate");
      } else {
        route("error");
      }
    }
  );
});

router.get("/profileUpdate", function (req, res, next) {
  res.send("profile update page");
});

module.exports = router;
