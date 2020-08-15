const mysql = require("../modules/mysql");

const table = "Saint";

async function insertUser(userData) {
  const fields = "pnumber, password, salt, name, jeja, isTheDream";
  const values = [
    userData.pnumber,
    userData.password,
    userData.salt,
    userData.name,
    userData.jeja,
    userData.isTheDream,
  ];
  const insertQuery = `INSERT INTO ${table} (${fields}) VALUES (?, ?, ?, ?, ?, ?);`;

  return await mysql.query(insertQuery, values);
}

async function selectUserByPnum(pnumber) {
  const selectQuery = `SELECT * FROM ${table} WHERE pnumber = ?;`;

  return await mysql.query(selectQuery, [pnumber]);
}

async function selectUserProfile(userData) {
  const fields = "name, jeja, image";
  const pnumber = userData.pnumber;
  const selectQuery = `SELECT ${fields} FROM ${table} WHERE pnumber = ?`;

  return await mysql.query(selectQuery, pnumber);
}

module.exports = {
  insertUser,
  selectUserByPnum,
  selectUserProfile,
};
