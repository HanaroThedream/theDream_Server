const mysql = require("../modules/mysql");
const moment = require("moment");

async function selectPosts() {
  const postLimit = 10;

  const selectQuery = `SELECT writer, image, date, text, like FROM Saint, post WHERE writer = pnumber ORDER BY date DESC LIMIT ${postLimit}`;

  return await mysql.query(selectQuery);
}

async function selectPostById(pid) {
  const selectQuery = `SELECT writer, date, text, like FROM post WHERE pid = ?`;

  return await mysql.query(selectQuery, [pid]);
}

async function insertPost(pnumber, text) {
  const fields = "writer, date, text, like";
  const values = [pnumber, moment().format("YYYY-MM-DD HH:MM:SS"), text, 0];
  const insertQuery = `INSERT INTO post (${fields}) VALUES (?, ?, ?, ?)`;

  return await mysql.query(insertQuery, values);
}

async function updatePost(pid, text) {
  const updateQuery = `UPDATE post SET text = ? WHERE pid = ?`;

  return await mysql.query(updateQuery, [text, pid]);
}

module.exports = {
  selectPosts,
  selectPostById,
  insertPost,
  updatePost,
};
