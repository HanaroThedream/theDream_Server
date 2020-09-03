const homeDa = require("../DataAccess/homeDa");
const jwt = require("../modules/jwt");

async function getHome() {
  const weeklyScripture = await homeDa.selectScripture();

  if (!weeklyScripture) {
    return -1;
  } else {
    return weeklyScripture;
  }
}

async function getOath() {
  const oath = await homeDa.selectOath();

  if (!oath) {
    return -1;
  } else {
    return oath;
  }
}

async function getScriptures() {
  const oath = await homeDa.selectOath();

  if (!oath) {
    return -1;
  } else {
    return oath;
  }
}

async function postAttendance(token, attendanceData) {
  if (!attendanceData) {
    //입력값 없음
    return -1;
  }

  const verified = await jwt.verify(token);
  const attendanceHistory = await homeDa.selectUserAttendance(verified.pnumber);

  if (!(attendanceHistory.length <= 0)) {
    //이미 입력했음
    return -2;
  } else {
    return await homeDa.insertUserAttendance(verified.pnumber, attendanceData);
  }
}

module.exports = {
  getHome,
  getOath,
  getScriptures,
  postAttendance,
};
