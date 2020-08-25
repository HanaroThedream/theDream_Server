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
      success(res, statusCode.OK, "비밀번호 확인");
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function getMypage(req, res) {
  try {
    const mypageInfo = await mypageService.getMypage(req.headers.authorization);

    success(res, status.OK, "프로필 불러오기 성공", mypageInfo);
  } catch (err) {
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  } finally {
  }
}

async function putUpdateInfo(req, res) {}

async function getMyWritten(req, res) {}

module.exports = {
  postCheckPassword,
  getMypage,
};
