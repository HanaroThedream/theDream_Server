const userDa = require("../DataAccess/userDa");
const assignmentDa = require("../DataAccess/assignmentDa");
const jwt = require("../modules/jwt");
const { verify } = require("../modules/jwt");
const assignments = require("../modules/assignments");

async function getAssignment(token) {
  const verified = jwt.verify(token);

  const dbUser = await userDa.selectUserProfileByPnum(verified.pnumber);
  if (dbUser.length <= 0) {
    //해당 유저 없음
    return -1;
  }

  const userInfo = dbUser[0];
  const history = await assignmentDa.selectAssignmentHistory(verified.pnumber);
  const asmDetails = await assignmentDa.selectAssignmentDetails(
    verified.pnumber
  );
  const thisWeek = asmDetails[0];

  return {
    userInfo,
    history,
    thisWeek,
  };
}

async function getRank() {
  const jejaRank = await assignmentDa.selectRankOfJeja();
  const personalRank = await assignmentDa.selectPersonalRank();

  return {
    jejaRank,
    personalRank,
  };
}

async function postSubmitAssignment(token, asmDetails) {
  const verified = jwt.verify(token);

  /*
  const {
    morWorship,
    afnWorship,
    friWorship,
    wedWorship,
    dawnWorship,
    duty,
    scripture,
    bible,
    pray,
    health,
    noNightMeal,
    grain,
    ctrAmount,
    chewing,
    balancedDiet,
    talking,
    compliment,
    laughing,
    massage,
    homepage,
    bodyHeat,
    mission,
    praise,
    amen,
    noDrama,
    greeting,
    happiness,
    myMinister,
  } = asmDetails;

  if (
    !morWorship ||
    !afnWorship ||
    !friWorship ||
    !wedWorship ||
    !dawnWorship ||
    !duty ||
    !scripture ||
    !bible ||
    !pray ||
    !health ||
    !noNightMeal ||
    !grain ||
    !ctrAmount ||
    !chewing ||
    !balancedDiet ||
    !talking ||
    !compliment ||
    !laughing ||
    !massage ||
    !homepage ||
    !bodyHeat ||
    !mission ||
    !praise ||
    !amen ||
    !noDrama ||
    !greeting ||
    !happiness ||
    !myMinister
  ) {
    //입력값 부족
    return -1;
  }
*/
  if (Object.keys(asmDetails).length != Object.keys(assignments)) {
    //입력값 부족
    return -1;
  }

  return await assignmentDa.insertAssignment(verified.pnumber, asmDetails);
}

module.exports = {
  getAssignment,
  getRank,
  postSubmitAssignment,
};
