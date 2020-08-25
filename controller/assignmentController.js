const { success, fail } = require("../modules/response");
const statusCode = require("../modules/statusCode");
const assignmentService = require("../service/assignmentService");

async function getAssignment(req, res) {
  try {
    const assignmentInfo = await assignmentService.getAssignment(
      req.headers.authorization
    );

    if (assignmentInfo == -1) {
      fail(res, statusCode.BAD_REQUEST, "로그인 정보 없음");
    } else {
      success(res, statusCode.OK, "과제 데이터 성공", assignmentInfo);
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function postSubmitAssignment(req, res) {
  try {
    const check = await assignmentService.postSubmitAssignment(
      req.headers.authorization,
      req.body
    );

    if (check == -1) {
      fail(res, statusCode.BAD_REQUEST, "입력값 부족");
    } else {
      success(res, statusCode.OK, "과제 제출 성공");
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

module.exports = {
  getAssignment,
  postSubmitAssignment,
};
