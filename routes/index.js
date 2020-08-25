const express = require("express");
const router = express.Router();

router.use(("/user", require("./user")));
router.use("/mypage", require("./mypage"));
router.use("/home", require("./home"));

module.exports = router;

/* GET home page. */
/*
router.get("/", function (req, res, next) {
  //세션이 있을 때
  if (req.session.pnum) {
    //res.sendFile(path.join(__dirname, "../", "public", "home.html"));
    res.redirect("/home");
  } else {
    //세션 없으면 로그인하러
    res.redirect("/users/login");
  }
});

module.exports = router;
*/
