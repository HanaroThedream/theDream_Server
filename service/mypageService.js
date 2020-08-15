const mypageDa = require("../DataAccess/mypageDa");
const userDa = require("../DataAccess/userDa");
const jwt = require("../modules/jwt");
const encryption = require("../modules/encryption");

async function postCheckPassword(token, inputData) {
  const verified = jwt.verify(token);
  const dbUser = await userDa.selectUserByPnum(verified.pnumber);

  const hashedPassword = await encryption.saltEncrypt(
    inputData.password,
    dbUser[0].salt
  );

  if (dbUser[0].password != hashedPassword) {
    //비밀번호 틀림
    return -1;
  } else {
    return 0;
  }
}

async function getMypage() {}

async function putMypage() {}

module.exports = {
  postCheckPassword,
};
