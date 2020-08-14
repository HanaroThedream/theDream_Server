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

async function selectUserByPnum(userData) {
  const selectQuery = `SELECT * FROM ${table} WHERE pnumber = ?;`;
  const pnumber = [userData.pnumber];

  return await mysql.query(selectQuery, pnumber);
}

module.exports = {
  insertUser,
  selectUserByPnum,
};
