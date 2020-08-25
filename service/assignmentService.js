const userDa = require("../DataAccess/userDa");
const assignmentDa = require("../DataAccess/assignmentDa");
const jwt = require("../modules/jwt");
const { verify } = require("../modules/jwt");

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

async function postSubmitAssignment(token, asmDetails) {
  const verified = jwt.verify(token);

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

  if (!morWorship) {
    //입력값 부족
    return -1;
  }

  return await assignmentDa.insertAssignment(verified.pnumber, asmDetails);
}

module.exports = {
  getAssignment,
  postSubmitAssignment,
};

/*
1. 공예배드리기
   오전예배 morWorship
   오후예배 - afnWorship
   금테기 - friWorship
   수요예배 - wedWorship
   새총 - dawnWorship
2. 사역 - duty
3. 성구암송 - scripture
4. 샹경읽기 - bible
5. 기도 - pray
6. 운동 - health
7. 야식금지 - noNightMeal
8. 잡곡섭취 - grain
9. 양조절 - ctrAmount
10. 오래씹기 - chewing
11. 싱겁게 먹기 - noSalty
12. 골고루 먹기 - balancedDiet
13. 대화하기 - talking
14. 칭찬하기 - compliment
15. 웃기 - laughing
16. 안마하기 - massage
17. 홈피글올리기 - homepage
18. 체온올리기 - bodyHeat
19. 전도 - mission
20. 다윗찬양 - praise
21. 아멘하기 - amen
22. 드라마안보기 - noDrama
23. 따뜻한인사 - greeting
24. 늘푸른행복 - happiness
25. 사랑하는 나의 목사님과의 교제 - myMinister

*/
