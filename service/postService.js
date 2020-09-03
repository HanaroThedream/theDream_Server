const postDa = require("../DataAccess/postDa");
const jwt = require("../modules/jwt");
const { verify } = require("../modules/jwt");

async function getFeeds() {
  return await postDa.selectPosts();
}

async function getPost(token, pid) {
  const result = await postDa.selectPostById(pid);
  const post = result[0];

  const verified = await jwt.verify(token);

  if (post.writer === verified.pnumber) {
    return {
      writerOfPost: 1,
      post,
    };
  } else {
    return post;
  }
}

async function postAddPost(token, text) {
  if (!text) {
    //내용 없음
    return -1;
  }
  const verified = await jwt.verify(token);

  return await postDa.insertPost(verified.pnumber, text);
}

async function putUpdatePost(pid, text) {
  if (!text) {
    return -1;
  }

  return await postDa.putUpdatePost(pid, text);
}

moduls.exports = {
  getFeeds,
  getPost,
  postAddPost,
  putUpdatePost,
};
