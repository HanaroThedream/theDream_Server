const userService = require("../service/userService");
const { success, fail } = require("../modules/response");
const statusCode = require("../modules/statusCode");
//const responseMessage = require("../modules/responseMessage");

async function postUserLogIn(req, res) {
  try {
    const check = await userService.postUserLogIn(req.body);

    if (check == -1) {
      //해당 아이디 없음
      fail(res, statusCode.BAD_REQUEST, "존재하지 않는 회원입니다.");
    } else if (check == -2) {
      //비밀번호 틀림
      fail(res, statusCode.UNAUTHORIZED, "잘못된 비밀번호입니다.");
    } else {
      success(res, statusCode.OK, "로그인 성공");
    }
  } catch (error) {
    console.log(error);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function postUserSignUp(req, res) {
  try {
    const check = await userService.postUserSignUp(req.body);

    if (check == -1) {
      //데이터 부족
      fail(res, statusCode.BAD_REQUEST, "입력값이 부족합니다.");
    } else if (check == -2) {
      //이미 존재하는 회원
      fail(res, statusCode.BAD_REQUEST, "이미 존재하는 회원입니다.");
    } else {
      success(res, statusCode.OK, "회원가입 성공");
    }
  } catch (error) {
    console.log(error);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

module.exports = {
  postUserLogIn,
  postUserSignUp,
};
