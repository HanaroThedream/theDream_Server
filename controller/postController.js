const { success, fail } = require("../modules/response");
const statusCode = require("../modules/statusCode");
const postService = require("../service/postService");

async function getFeeds(req, res) {
  if (!req.headers.authorization) {
    //로그인 정보 없음
    fail(res, statusCode.BAD_REQUEST, "로그인 정보 없음");
  }

  try {
    const posts = await postService.getFeeds();

    if (posts == -1) {
      //로그인 안됨
      fail(res, statusCode.BAD_REQUEST, "로그인 필요");
    } else {
      success(res, statusCode.OK, "피드 불러오기 성공", posts);
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function getPost(req, res) {
  try {
    const result = await postService.getPost(
      req.headers.authorization,
      req.params.id
    );

    success(res, statusCode.OK, "게시글 불러오기 성공", result);
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function postAddPost(req, res) {
  try {
    const result = await postService.postAddPost(
      req.headers.authorization,
      req.body
    );

    if (result == -1) {
      //내용 없음
      fail(res, statusCode.BAD_REQUEST, "내용 없음");
    } else {
      success(res, statusCode.OK, "글 쓰기 성공");
    }
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

async function putUpdatePost(req, res) {
  try {
    const result = await postService.putUpdatePost(req.params.id, req.body);

    if (result == -1) {
      //내용 없음
      fail(res, statusCode.BAD_REQUEST, "내용 없음");
    }
    success(res, statusCode.OK, "글 수정 성공");
  } catch (err) {
    console.log(err);
    fail(res, statusCode.INTERNAL_SERVER_ERROR, "서버 내부 에러");
  }
}

module.exports = {
  getFeeds,
  getPost,
  postAddPost,
  putUpdatePost,
};
