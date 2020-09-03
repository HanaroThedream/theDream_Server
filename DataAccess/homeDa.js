const mysql = require("../modules/mysql");
const moment = require("moment");

async function selectScriptures() {
  const selectQuery = `SELECT * FROM scripture`;

  return await mysql.query(selectQuery);
}

async function selectScriptureOfWeek() {
  const thisSunday = moment().add(-moment().day(), "day").format("YYYY-MM-DD");
  const selectQuery = `SELECT * FROM scripture WHERE date = ?`;

  return await mysql.query(selectQuery, [thisSunday]);
}

async function selectOath() {
  const selectQuery = `SELECT * FROM oath`;

  return await mysql.query(selectQuery);
}

async function selectUserAttendance(pnumber) {
  const selectQuery = `SELECT * FROM attendance WHERE pnumber = ?`;

  return await mysql.query(selectQuery, [pnumber]);
}

async function insertUserAttendance(pnumber, attendanceData) {
  const thisSunday = moment().add(-moment().day(), "day").format("YYYY-MM-DD");
  const fields = "pnumber, date, attendance";
  const values = [pnumber, thisSunday, attendanceData];

  const insertQuery = `INSERT INTO attendance (${fields}) VALUES (?, ?, ?)`;
  return await mysql.query(insertQuery, values);
}

module.exports = {
  selectScriptures,
  selectScriptureOfWeek,
  selectOath,
  selectUserAttendance,
  insertUserAttendance,
};
