const statusCode = require("../modules/statusCode");
const { success, fail } = require("../modules/response");

const homeService = require("../service/homeService");

async function getHome(req, res) {
  try {
    const result = await homeService.getHome();

    if (result == -1) {
      fail(res, statusCode.BAD_REQUEST, "이번 주 성구 불러오기 실패");
    } else {
      success(res, statusCode.OK, "홈 탭 불러오기 성공", result);
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function getOath(req, res) {
  try {
    const result = await homeService.geOath();

    if (result == -1) {
      fail(res, statusCode.BAD_REQUEST, "선서문 불러오기 실패");
    } else {
      success(res, statusCode.OK, "선서문 불러오기 성공", result);
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function getScriptures(req, res) {
  try {
    const result = await homeService.getScriptures();

    if (result == -1) {
      fail(res, statusCode.BAD_REQUEST, "성구 불러오기 실패");
    } else {
      success(res, statusCode.OK, "성구 불러오기 성공", result);
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function postAttendance(req, res) {
  try {
    const result = await homeService.postAttendance(
      req.headers.authorization,
      req.body
    );
    if (result == -1) {
      //입력값 없음
      fail(res, statusCode.BAD_REQUEST, "입력값 부족");
    } else if (result == -2) {
      //이미 입력했음
      fail(res, statusCode.BAD_REQUEST, "이미 입력 했음");
    } else {
      success(res, statusCode.OK, "출석체크 성공", result);
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

module.exports = {
  getHome,
  getOath,
  getScriptures,
  postAttendance,
};
