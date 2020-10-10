const mysql = require("../modules/mysql");
const moment = require("moment");
const table = "assignment";
const assignments =
  "pnumber, date, morWorship, afnWorship, friWorship, wedWorship, dawnWorship,duty, scripture, bible, pray, health, noNightMeal, grain, ctrAmount, chewing, balancedDiet, talking, compliment, laughing, massage, homepage, bodyHeat, mission, praise, amen, noDrama, greeting, happiness, myMinister";
const rankLimit = 10;
const thisSunday = moment().add(-moment().day(), "day").format("YYYY-MM-DD");

async function selectAssignmentHistory(pnumber) {
  const fiveWeeksAgoSunday = moment()
    .add(-moment().day(), "day")
    .add(-5, "week")
    .format("YYYY-MM-DD");

  const selectQuery = `SELECT * FROM ${table} 
  WHERE pnumber = ? AND date BETWEEN DATE(?) AND DATE(?)-1`;

  return await mysql.query(selectQuery, [
    pnumber,
    fiveWeeksAgoSunday,
    thisSunday,
  ]);
}

async function selectAssignmentDetails(pnumber) {
  const selectQuery = `SELECT ${assignments} FROM ${table} WHERE pnumber = ? AND date = ?`;

  return await mysql.query(selectQuery, [pnumber, thisSunday]);
}

async function selectAssignmentPercentage(pnumber) {
  const selectQuery = `SELECT percentage FROM ${table} WHERE pnumber = ? AND date = ?`;

  return await mysql.query(selectQuery, [pnumber, thisSunday]);
}
async function insertAssignment(pnumber, asmDetails) {
  const fields = `${assignments}, percentage`;

  var percentage = 0;
  for (x in asmDetails) {
    if (asmDetails[x] == 2) {
      percentage++;
    }
  }
  percentage = (percentage / Object.keys(asmDetails).length) * 100;

  var values = [pnumber, thisSunday];
  for (x in asmDetails) {
    values.push(asmDetails[x]);
  }
  values.push(percentage);

  //const insertQuery = `INSERT INTO ${table} (${fields}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const insertQuery = `INSERT INTO ${table} (${fields}) VALUES (${"?,".repeat(
    Object.keys(values).length - 1
  )} ?)`;

  return await mysql.query(insertQuery, values);
}

async function selectRankOfJeja() {
  const selectQuery = `SELECT jeja, SUM(percentage) / total * 100 AS Percentage FROM Saint, assignment, (SELECT COUNT(*) AS total FROM Saint GROUP BY jeja) WHERE date = ? AND pnumber = pnumber GROUP BY jeja`;

  return await mysql.query(selectQuery, [thisSunday]);
}

async function selectPersonalRank() {
  const selectQuery = `SELECT pnumber, percentage FROM assignment WHERE date = ? ORDER BY percentage DESC LIMIT ${rankLimit}`;

  return await mysql.query(selectQuery, [thisSunday]);
}

module.exports = {
  selectAssignmentDetails,
  selectAssignmentHistory,
  selectAssignmentPercentage,
  insertAssignment,
  selectRankOfJeja,
  selectPersonalRank,
};
