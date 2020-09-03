const userDa = require("../DataAccess/userDa");
const jwt = require("../modules/jwt");
const encryption = require("../modules/encryption");

async function postUserLogIn(inputUser) {
  const dbUser = await userDa.selectUserByPnum(inputUser.pnumber);

  //아이디 없음
  if (dbUser.length <= 0) {
    return -1;
  }

  const hashedPassword = await encryption.saltEncrypt(
    inputUser.password,
    dbUser[0].salt
  );
  //비밀번호 틀림
  if (dbUser[0].password != hashedPassword) {
    return -2;
  } else {
    //로그인 성공
    const token = jwt.sign(dbUser[0].pnumber);
    return token;
  }
}

async function postUserSignUp(inputUser) {
  //데이터가 부족할 때
  const { pnumber, password, name, jeja, isTheDream } = inputUser;

  if (!pnumber || !password || !name || !jeja || !isTheDream) {
    return -1;
  }
  //이미 존재할 때
  const result = await userDa.selectUserByPnum(inputUser.pnumber);
  if (!(result.length <= 0)) {
    return -2;
  }

  const encryptionObj = await encryption.newSaltEncrypt(inputUser.password);
  const salt = encryptionObj.salt;
  const hashedPassword = encryptionObj.hashedPassword;
  inputUser.salt = salt;
  inputUser.password = hashedPassword;

  const check = await userDa.insertUser(inputUser);

  return check;
}

module.exports = {
  postUserLogIn,
  postUserSignUp,
};
