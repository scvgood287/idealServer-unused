const rawData = [
  "member_men_bts_v_0000.jpg",
  "member_men_bts_v_0001.jpg",
  "member_men_bts_v_0002.jpg",
  "member_men_bts_v_0003.jpg",
  "member_men_bts_rm_0000.jpg",
  "member_men_bts_rm_0001.jpg",
  "member_men_bts_rm_0002.jpg",
  "member_men_bts_rm_0003.jpg",
  "member_men_bts_jimin_0000.jpg",
  "member_men_bts_jimin_0001.jpg",
  "member_men_bts_jimin_0002.jpg",
  "member_men_bts_jimin_0003.jpg",
  "member_men_bts_jungkook_0000.jpg",
  "member_men_bts_jungkook_0001.jpg",
  "member_men_bts_jungkook_0002.jpg",
  "member_men_bts_jungkook_0003.jpg",
  "member_men_exo_kai_0000.jpg",
  "member_men_exo_kai_0001.jpg",
  "member_men_exo_kai_0002.jpg",
  "member_men_exo_kai_0003.jpg",
  "member_men_exo_do_0000.jpg",
  "member_men_exo_do_0001.jpg",
  "member_men_exo_do_0002.jpg",
  "member_men_exo_do_0003.jpg",
  "member_men_exo_baekhyun_0000.jpg",
  "member_men_exo_baekhyun_0001.jpg",
  "member_men_exo_baekhyun_0002.jpg",
  "member_men_exo_baekhyun_0003.jpg",
  "member_men_exo_chanyeol_0000.jpg",
  "member_men_exo_chanyeol_0001.jpg",
  "member_men_exo_chanyeol_0002.jpg",
  "member_men_exo_chanyeol_0003.jpg",
  "member_men_seventeen_sCoups_0000.jpg",
  "member_men_seventeen_sCoups_0001.jpg",
  "member_men_seventeen_sCoups_0002.jpg",
  "member_men_seventeen_sCoups_0003.jpg",
  "member_men_seventeen_dk_0000.jpg",
  "member_men_seventeen_dk_0001.jpg",
  "member_men_seventeen_dk_0002.jpg",
  "member_men_seventeen_dk_0003.jpg",
  "member_men_seventeen_joshua_0000.jpg",
  "member_men_seventeen_joshua_0001.jpg",
  "member_men_seventeen_joshua_0002.jpg",
  "member_men_seventeen_joshua_0003.jpg",
  "member_men_seventeen_dino_0000.jpg",
  "member_men_seventeen_dino_0001.jpg",
  "member_men_seventeen_dino_0002.jpg",
  "member_men_seventeen_dino_0003.jpg",
  "member_men_astro_chaEunwoo_0000.jpg",
  "member_men_astro_chaEunwoo_0001.jpg",
  "member_men_astro_chaEunwoo_0002.jpg",
  "member_men_astro_chaEunwoo_0003.jpg",
  "member_men_astro_moonBIn_0000.jpg",
  "member_men_astro_moonBIn_0001.jpg",
  "member_men_astro_moonBIn_0002.jpg",
  "member_men_astro_moonBIn_0003.jpg",
  "member_men_astro_yoonSanha_0000.jpg",
  "member_men_astro_yoonSanha_0001.jpg",
  "member_men_astro_yoonSanha_0002.jpg",
  "member_men_astro_yoonSanha_0003.jpg",
  "member_men_astro_jinjin_0000.jpg",
  "member_men_astro_jinjin_0001.jpg",
  "member_men_astro_jinjin_0002.jpg",
  "member_men_astro_jinjin_0003.jpg",
  "member_women_blackpink_jennie_0000.jpg",
  "member_women_blackpink_jennie_0001.jpg",
  "member_women_blackpink_jennie_0002.jpg",
  "member_women_blackpink_jennie_0003.jpg",
  "member_women_blackpink_lisa_0000.jpg",
  "member_women_blackpink_lisa_0001.jpg",
  "member_women_blackpink_lisa_0002.jpg",
  "member_women_blackpink_lisa_0003.jpg",
  "member_women_blackpink_jisoo_0000.jpg",
  "member_women_blackpink_jisoo_0001.jpg",
  "member_women_blackpink_jisoo_0002.jpg",
  "member_women_blackpink_jisoo_0003.jpg",
  "member_women_blackpink_rose_0000.jpg",
  "member_women_blackpink_rose_0001.jpg",
  "member_women_blackpink_rose_0002.jpg",
  "member_women_blackpink_rose_0003.jpg",
  "member_women_twice_momo_0000.jpg",
  "member_women_twice_momo_0001.jpg",
  "member_women_twice_momo_0002.jpg",
  "member_women_twice_momo_0003.jpg",
  "member_women_twice_sana_0000.jpg",
  "member_women_twice_sana_0001.jpg",
  "member_women_twice_sana_0002.jpg",
  "member_women_twice_sana_0003.jpg",
  "member_women_twice_mina_0000.jpg",
  "member_women_twice_mina_0001.jpg",
  "member_women_twice_mina_0002.jpg",
  "member_women_twice_mina_0003.jpg",
  "member_women_twice_tzuyu_0000.jpg",
  "member_women_twice_tzuyu_0001.jpg",
  "member_women_twice_tzuyu_0002.jpg",
  "member_women_twice_tzuyu_0003.jpg",
  "member_women_loona_chuu_0000.jpg",
  "member_women_loona_chuu_0001.jpg",
  "member_women_loona_chuu_0002.jpg",
  "member_women_loona_chuu_0003.jpg",
  "member_women_loona_oliviaHye_0000.jpg",
  "member_women_loona_oliviaHye_0001.jpg",
  "member_women_loona_oliviaHye_0002.jpg",
  "member_women_loona_oliviaHye_0003.jpg",
  "member_women_loona_vivi_0000.jpg",
  "member_women_loona_vivi_0001.jpg",
  "member_women_loona_vivi_0002.jpg",
  "member_women_loona_vivi_0003.jpg",
  "member_women_loona_yves_0000.jpg",
  "member_women_loona_yves_0001.jpg",
  "member_women_loona_yves_0002.jpg",
  "member_women_loona_yves_0003.jpg",
  "member_women_giDle_soyeon_0000.jpg",
  "member_women_giDle_soyeon_0001.jpg",
  "member_women_giDle_soyeon_0002.jpg",
  "member_women_giDle_soyeon_0003.jpg",
  "member_women_giDle_soojin_0000.jpg",
  "member_women_giDle_soojin_0001.jpg",
  "member_women_giDle_soojin_0002.jpg",
  "member_women_giDle_soojin_0003.jpg",
  "member_women_giDle_minnie_0000.jpg",
  "member_women_giDle_minnie_0001.jpg",
  "member_women_giDle_minnie_0002.jpg",
  "member_women_giDle_minnie_0003.jpg",
  "member_women_giDle_miyeon_0000.jpg",
  "member_women_giDle_miyeon_0001.jpg",
  "member_women_giDle_miyeon_0002.jpg",
  "member_women_giDle_miyeon_0003.jpg",
  "group_men_bts_0000.jpg",
  "group_men_bts_0001.jpg",
  "group_men_bts_0002.jpg",
  "group_men_bts_0003.jpg",
  "group_men_exo_0000.jpg",
  "group_men_exo_0001.jpg",
  "group_men_exo_0002.jpg",
  "group_men_exo_0003.jpg",
  "group_men_seventeen_0000.jpg",
  "group_men_seventeen_0001.jpg",
  "group_men_seventeen_0002.jpg",
  "group_men_seventeen_0003.jpg",
  "group_men_astro_0000.jpg",
  "group_men_astro_0001.jpg",
  "group_men_astro_0002.jpg",
  "group_men_astro_0003.jpg",
  "group_women_blackpink_0000.jpg",
  "group_women_blackpink_0001.jpg",
  "group_women_blackpink_0002.jpg",
  "group_women_blackpink_0003.jpg",
  "group_women_twice_0000.jpg",
  "group_women_twice_0001.jpg",
  "group_women_twice_0002.jpg",
  "group_women_twice_0003.jpg",
  "group_women_loona_0000.jpg",
  "group_women_loona_0001.jpg",
  "group_women_loona_0002.jpg",
  "group_women_loona_0003.jpg",
  "group_women_giDle_0000.jpg",
  "group_women_giDle_0001.jpg",
  "group_women_giDle_0002.jpg",
  "group_women_giDle_0003.jpg",
  "members_women_giDle_miyeon_0000.jpg",
  "members_women_giDle_miyeon_0001.jpg",
  "members_women_giDle_miyeon_0002.jpg",
  "members_women_giDle_miyeon_0003.jpg",
  "groups_men_bts_0000.jpg",
  "groups_men_bts_0001.jpg",
  "groups_men_bts_0002.jpg",
  "groups_men_bts_0003.jpg",
  "member_woman_giDle_miyeon_0000.jpg",
  "member_woman_giDle_miyeon_0001.jpg",
  "member_woman_giDle_miyeon_0002.jpg",
  "member_woman_giDle_miyeon_0003.jpg",
  "group_man_bts_0000.jpg",
  "group_man_bts_0001.jpg",
  "group_man_bts_0002.jpg",
  "group_man_bts_0003.jpg",
]

const createTestData = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
// 사용자가 클라이언트에 데이터 임시 업로드
const testData = createTestData(rawData);

// 임시 업로드한 데이터 첫 정렬
// 사용자가 이미지 재라벨링 시, 정렬이 다시 일어남으로 재활용 가능한 코드로 수정할 필요 있음
const editData = (resData) => {
  
  // 전체 공백 제거
  const trimStr = (str) => (str.replaceAll(' ',''));

  // 데이터 가공 후, 분류하여 해당하는 배열에 저장할 때부터 prop 값을 기반으로 올바른 위치에 push하는 알고리즘
  const compareStr = (str, input) => (str >= input);
  const inputData = (arr, obj, prop) => {
    // targetArray에서 objData의 올바른 위치 찾기.
    let index = arr.findIndex((e) => compareStr(e[prop], obj[prop]));
    // 올바른 위치에 data push
    (index <= -1) ? arr[arr.length] = obj : arr.splice(index, 0, obj);
  }

  // 매우 간단한 string sort 알고리즘
  // const compareStr = (a, b) => ((a < b) ? -1 : (a > b) ? 1 : 0);
  // const sortArr = (objArr) => ((!objArr) ? objArr : objArr.sort((a, b) => compareStr(a.originalName, b.originalName)));
  // const sortErrArr = (errDataArr) => ((!errDataArr) ? errDataArr : errDataArr.sort((a, b) => compareStr(a.data, b.data)));

  // 데이터를 분류해 넣을 targetArray들
  let memberMenData = [];
  let memberWomenData = [];
  let memberMixedData = [];

  let groupMenData = [];
  let groupWomenData = [];
  let groupMixedData = [];

  let errUploadTypeData = [];
  let errMemberData = [];
  let errGroupData = [];
  
  resData.forEach((data) => {
    const dataName = trimStr(data).split('.');
    const splitData = dataName[0].split('_');
  
    // 받은 데이터 하나하나를 객체로 생성. 후에 inputData(targetArray, tempObj, prop)을 사용해 올바른 위치에 push
    // inputData의 prop은 정렬 기준. errDataArray의 경우는 data, 그 이외에는 originalName
    let tempObj = {
      uploadType: splitData[0],
      gender: splitData[1],
      group: splitData[2],
      member: splitData[3],
      changedName: `${splitData[1]}_${splitData[2]}_${splitData[3]}`,
      originalName: dataName[0],
      fileType: dataName[1],
    };

    let tempErrObj = {
      data,
      errMsg: "잘못된 uploadType입니다. 수정해주세요."
    };

    let { uploadType, gender, group, member, changedName } = tempObj;
  
    if (uploadType === 'member') {
  
      switch (gender) {
        case ('men') : inputData(memberMenData, tempObj, "originalName"); break;
        case ('women') : inputData(memberWomenData, tempObj, "originalName"); break;
        case ('mixed') : inputData(memberMixedData, tempObj, "originalName"); break;
        default : inputData(errMemberData, {
          ...tempErrObj,
          errMsg: "gender 라벨링이 잘못된 memberImage입니다. 수정해주세요.",
        }, "data");
      };
    } else if (uploadType === 'group') {
      delete member;
      changedName = `${gender}_${group}`;
  
      switch (gender) {
        case ('men') : inputData(groupMenData, tempObj, "originalName"); break;
        case ('women') : inputData(groupWomenData, tempObj, "originalName"); break;
        case ('mixed') : inputData(groupMixedData, tempObj, "originalName"); break;
        default : inputData(errGroupData, {
          ...tempErrObj,
          errMsg: "gender 라벨링이 잘못된 groupImage입니다. 수정해주세요."
        }, "data");
      };
    } else {
      inputData(errUploadTypeData, tempErrObj, "data");
    };
  });
  
  const memberData = [memberMenData, memberWomenData, memberMixedData];
  const groupData = [groupMenData, groupWomenData, groupMixedData];
  const errData = [errUploadTypeData, errMemberData, errGroupData];
  
  // memberData.forEach((e) => (sortArr(e)));
  // groupData.forEach((e) => (sortArr(e)));
  // errData.forEach((e) => (sortErrArr(e)));

  return [memberData, groupData, errData];
};