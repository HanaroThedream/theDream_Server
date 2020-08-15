const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtconfig");
const statusCode = require("../modules/statusCode");
const { success, fail } = require("../modules/response");

function sign(pnumber) {
  return jwt.sign(
    {
      pnumber: pnumber,
    },
    jwtConfig.secretKey,
    {
      expiresIn: "24h",
    }
  );
}

function verify(token) {
  try {
    return jwt.verify(token, jwtConfig.secretKey);
  } catch (error) {
    if (err.message === "jwt expired") {
      console.log("expired token");
      return -3;
    } else if (err.message === "invalid token") {
      console.log("invalid token");
      return -2;
    }
  }
}

module.exports = {
  sign,
  verify,
};
