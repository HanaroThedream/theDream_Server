const mysql = require("../modules/mysql");
const moment = require("moment");
const table = "assignment";

async function selectAssignmentHistory(pnumber) {
  const thisSunday = moment().add(-moment().day(), "day").format("YYYY-MM-DD");
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
  const thisSunday = moment().add(-moment().day(), "day").format("YYYY-MM-DD");

  const selectQuery = `SELECT * FROM ${table} WHERE pnumber = ? AND date = ?`;

  return await mysql.query(selectQuery, [pnumber, thisSunday]);
}

async function insertAssignment(pnumber, asmDetails) {
  const thisSunday = moment().add(-moment().day(), "day").format("YYYY-MM-DD");

  const fields =
    "pnumber, date, morWorship, afnWorship, friWorship, wedWorship, dawnWorship,duty, scripture, bible, pray, health, noNightMeal, grain, ctrAmount, chewing, balancedDiet, talking, compliment, laughing, massage, homepage, bodyHeat, mission, praise, amen, noDrama, greeting, happiness, myMinister";

  const values = [
    pnumber,
    thisSunday,
    asmDetails.morWorship,
    asmDetails.afnWorship,
    asmDetails.friWorship,
    asmDetails.wedWorship,
    asmDetails.dawnWorship,
    asmDetails.duty,
    asmDetails.scripture,
    asmDetails.bible,
    asmDetails.pray,
    asmDetails.health,
    asmDetails.noNightMeal,
    asmDetails.grain,
    asmDetails.ctrAmount,
    asmDetails.chewing,
    asmDetails.balancedDiet,
    asmDetails.talking,
    asmDetails.compliment,
    asmDetails.laughing,
    asmDetails.massage,
    asmDetails.homepage,
    asmDetails.bodyHeat,
    asmDetails.mission,
    asmDetails.praise,
    asmDetails.amen,
    asmDetails.noDrama,
    asmDetails.greeting,
    asmDetails.happiness,
    asmDetails.myMinister,
  ];

  const insertQuery = `INSERT INTO ${table} (${fields}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  return await mysql.query(insertQuery, values);
}

async function selectRankOfJeja() {}

async function selectPersonalRank() {}

module.exports = {
  selectAssignmentDetails,
  selectAssignmentHistory,
  insertAssignment,
  selectRankOfJeja,
  selectPersonalRank,
};
