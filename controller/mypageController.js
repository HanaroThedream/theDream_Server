const mypageService = require("../service/mypageService");
const { success, fail } = require("../modules/response");
const statusCode = require("../modules/statusCode");

async function postCheckPassword(req, res) {
  try {
    const check = await mypageService.postCheckPassword(
      req.headers.authorization,
      req.body
    );

    if (check == -1) {
      //비밀번호 틀림
      fail(res, statusCode.UNAUTHORIZED, "잘못된 비밀번호");
    } else {
      success(res, statusCode.OK, "비밀번호 확인", check);
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

module.exports = {
  postCheckPassword,
};
