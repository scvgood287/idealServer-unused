// const Joi = require('joi');
// const { Types: { ObjectId } } = require('mongoose');
const {
  Gender,
  Group,
  GroupImage,
  GroupImageRate,
  GroupImageGameLog,
  Member,
  MemberImage,
  MemberImageRate,
  MemberImageGameLog
} = require('models/IdealsModel');

const findDoc = (model, filter) => (model.find(filter));
const createDoc = async (model, schema) => {
  const temp = await new model(schema);
  await temp.save();
  return temp;
}
const promiseAll = (promise) => (Promise.all(promise));
// schema props 필요 없는 듯....
const modelList = {
  gender: {
    model: Gender,
    schema: ({ name }) => ({ name, }),
  },
  group: {
    model: Group,
    schema: ({ genderId, name }) => ({ genderId, name, }),
  },
  groupImage: {
    model: GroupImage,
    schema: ({ groupId, imageUrl, name }) => ({ groupId, imageUrl, name, }),
  },
  groupImageRate: {
    model: GroupImageRate,
    schema: ({ groupImageId }) => ({
      groupImageId,
      first: 0,
      entry: 0,
      win: 0,
      lose: 0,
    }),
  },
  groupImageGameLog: {
    model: GroupImageGameLog,
    schema: ({ groupImageRateId, isFirst, isEntry, isWin, isLose }) => ({ groupImageRateId, isFirst, isEntry, isWin, isLose, }),
  },
  member: {
    model: Member,
    schema: ({ genderId, groupId, name }) => ({ genderId, groupId, name, }),
  },
  memberImage: {
    model: MemberImage,
    schema: ({ memberId, imageUrl, name }) => ({ memberId, imageUrl, name, }),
  },
  memberImageRate: {
    model: MemberImageRate,
    schema: ({ memberImageId }) => ({
      memberImageId,
      first: 0,
      entry: 0,
      win: 0,
      lose: 0,
    }),
  },
  memberImageGameLog: {
    model: MemberImageGameLog,
    schema: ({ memberImageRateId, isFirst, isEntry, isWin, isLose }) => ({ memberImageRateId, isFirst, isEntry, isWin, isLose, }),
  },
};

// 유저 클라

exports.getIdealsImages = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { gameValue, roundValue } = ctx.params;

  const makeIds = (v) => Array.from({ length: v }, (_, i) => i);
  const getRandomIds = (arr, requestInfoCount) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, requestInfoCount);
  };

  let idealsData = [];

  try {
    const genderDoc = await Gender.findOne({ name: gameValue }, (err, genderData) => {
      if (err) return ctx.throw(500, err);
      if (!genderData) ctx.throw(404,
        "존재하지 않는 gender입니다.",
        {
          "errors": [
            {
              "gameValue": gameValue,
            }
          ]
        }
      );
    });
    const memberDoc = await Member.find({ genderId: genderDoc._id }, (err, memberData) => {
      if (err) return ctx.throw(500, err);
      if (!memberData) ctx.throw(404,
        "gender에 해당하는 member이 없습니다.",
        {
          "errors": [
            {
              "gender": genderDoc,
            }
          ]
        }
      );
    });
    let images = [];
    for await (let [i, member] of memberDoc.entries()) {
      const imageList = await MemberImage.find({ memberId: member._id }, (err, imageData) => {
        if (err) return ctx.throw(500, err);
        if (!imageData) ctx.throw(404,
          "member에 해당하는 image가 없습니다.",
          {
            "errors": [
              {
                "member": member,
              }
            ]
          }
        );
      });
      images[i] = imageList[Math.floor(Math.random() * imageList.length)];
    }

    if (roundValue > images.length) {
      ctx.throw(400,
        "image의 수가 요청한 roundValue보다 적습니다.",
        {
          "errors": [
            {
              "images": images,
              "imagesLength": images.length,
              "roundValue": roundValue,
            }
          ]
        }
      );
    }

    for await (let [i, e] of getRandomIds(makeIds(images.length), roundValue).entries()) {
      idealsData[i] = images[e];
    }
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = idealsData;
};

exports.getRatedList = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { gameValue, showUp } = ctx.params;

  const swap = (arr, left, right) => {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  }
  const partition = (arr, left, right) => {
    const pivot = arr[ Math.floor((left + right) / 2) ][0]; // 물리적으로 중간을 pivot로 정한다.
  
    while (left <= right) { // 교차 지점이 오기 전까지
      while (arr[left][0] > pivot) left++; // arr의 왼쪽에서 pivot보다 작거나 같은 값을 찾는다. left = 1
      while (arr[right][0] < pivot) right--; // arr의 오른쪽에서 pivot보다 크거나 같은 값을 찾는다. right = 3
  
      if (left <= right) { // 교차 되기 전이라면
        swap(arr, left, right); // pivot 보다 크거나 같은값과, 작거나 같은값을 swap 한다.
        left++; // 그 다음 search를 위해서 left 1증가 left = 2
        right--; // right 1감소 right = 2
      }
    }
  
    return left; // 교차되고 난후 left를 그 다음 index로 리턴한다. 
  }
  const quickSortAndSlice = (arr, left = 0, right = arr.length - 1) => { // 초기값: 배열의 시작과 끝
    if (left >= right) return; // ending condition 
  
    let index = partition(arr, left, right);
    quickSortAndSlice(arr, left, index - 1); // index의 왼쪽
    quickSortAndSlice(arr, index, right); // index의 오른쪽
  
    return arr.slice(0, showUp);
  }
  const getRatedMembers = async (arr) => {
    // const rates = arr.map((e) => (e[0]));
    // const ids = arr.map((e) => (e[1]));
    let memberList = [];
    for await (let [i, e] of arr.entries()) {
      const memberDoc = await Member.findOne({ _id: e[1] });
      memberList[i] = [memberDoc, e[0]];
    }
    return memberList;
  }

  let ratedIdealData = [];
  try {
    const genderDoc = await Gender.findOne({ name: gameValue }, (err, genderData) => {
      if (err) return ctx.throw(500, err);
      if (!genderData) ctx.throw(404,
        "존재하지 않는 gender입니다.",
        {
          "errors": [
            {
              "gameValue": gameValue,
            }
          ]
        }
      );
    });
    const memberDoc = await Member.find({ genderId: genderDoc._id }, (err, memberData) => {
      if (err) return ctx.throw(500, err);
      if (!memberData) ctx.throw(404,
        "해당 gender의 member이 없습니다.",
        {
          "errors": [
            {
              "gender": genderDoc,
            }
          ]
        }
      );
    });
  
    if (showUp > memberDoc.length) {
      ctx.throw(400,
        "member의 수가 요청한 showUp보다 적습니다.",
        {
          "errors": [
            {
              "members": memberDoc,
              "membersLength": memberDoc.length,
              "showUp": showUp,
            }
          ]
        }
      );
    }
  
    let memberFirstRate = [], memberWinRate = [];
    for await (let [i, member] of memberDoc.entries()) {
      const imageDoc = await MemberImage.find({ memberId: member._id });
  
      let memberRate = {
        first: 0,
        entry: 0,
        win: 0,
        lose: 0,
      };
  
      for await (let image of imageDoc) {
        const imageRateDoc = await MemberImageRate.findOne({ imageId: image._id });
        const { first, entry, win, lose } = imageRateDoc;
        memberRate.first += first;
        memberRate.entry += entry;
        memberRate.win += win;
        memberRate.lose += lose;
      }
      const firstRate = (memberRate.entry === 0) ? -1 : Number(((memberRate.first * 100) / memberRate.entry).toFixed(2));
      const winRate = ((memberRate.win + memberRate.lose) === 0) ? -1 : Number(((memberRate.win * 100) / (memberRate.win + memberRate.lose)).toFixed(2));
  
      memberFirstRate[i] = [firstRate, member._id];
      memberWinRate[i] = [winRate, member._id];
    }
    // showUp 만큼의 상위 데이터 추출 or 정렬 후 showUp 만큼 slice.
    // 어느 쪽이 나은지 고민할 필요가 있음.
    const ratedByFirst = await getRatedMembers(quickSortAndSlice(memberFirstRate));
    const ratedByWin = await getRatedMembers(quickSortAndSlice(memberWinRate));

    ratedIdealData = [ratedByFirst, ratedByWin];
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = ratedIdealData;
};

exports.uploadLog = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { body } = ctx.request;

  try {
    for await (let { imageRateId, isFirst, isEntry, isWin, isLose } of body) {
      let gameLogDoc = await new MemberImageGameLog({
        imageRateId: imageRateId,
        isFirst: isFirst,
        isEntry: isEntry,
        isWin: isWin,
        isLose: isLose,
      });

      await gameLogDoc.save();
    }
  } catch (e) {
    return ctx.throw(500, e);
  }
  // ctx.request.body
  // [
  //   {
  //     "imageRateId": 1,
  //     "isFirst": 0,
  //     "isEntry": 1,
  //     "isWin": 0,
  //     "isLose": 1
  //   },
  //   {
  //     "imageRateId": 2,
  //     "isFirst": 0,
  //     "isEntry": 1,
  //     "isWin": 0,
  //     "isLose": 1
  //   },
  //   {
  //     "imageRateId": 3,
  //     "isFirst": 0,
  //     "isEntry": 1,
  //     "isWin": 1,
  //     "isLose": 1
  //   },
  //   {
  //     "imageRateId": 4,
  //     "isFirst": 1,
  //     "isEntry": 1,
  //     "isWin": 3,
  //     "isLose": 0
  //   },
  //   {
  //     "imageRateId": 5,
  //     "isFirst": 0,
  //     "isEntry": 1,
  //     "isWin": 0,
  //     "isLose": 1
  //   },
  //   {
  //     "imageRateId": 6,
  //     "isFirst": 0,
  //     "isEntry": 1,
  //     "isWin": 0,
  //     "isLose": 1
  //   },
  //   {
  //     "imageRateId": 7,
  //     "isFirst": 0,
  //     "isEntry": 1,
  //     "isWin": 1,
  //     "isLose": 1
  //   },
  //   {
  //     "imageRateId": 8,
  //     "isFirst": 0,
  //     "isEntry": 1,
  //     "isWin": 2,
  //     "isLose": 1
  //   }
  // ]
};

// 이미지 업로드 용 클라

exports.getCollections = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const targetModel = ['gender', 'group', 'member'];

  const targetDocs = targetModel.map(async (e) => (await findDoc(modelList[e].model)));
  const results = await promiseAll(targetDocs);

  ctx.body = results;
};

exports.createDocuments = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const [targetCollection, data] = ctx.request.body;

  const { model } = modelList[targetCollection];
  const targetDocs = data.map(async (e) => (await createDoc(model, e)));
  const results = await promiseAll(targetDocs);

  ctx.body = results;
};

exports.uploadImages = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');

  // 0_test

  // const { created, data } = ctx.request.body;
  // const { gender, group, member, image } = data;

  // const createImageAndImageRate = async (imagesData, getMemberId) => {
  //   for (let i = 0; i < imagesData.length; i++) {
  //     const { imageKnows, images } = imagesData[i];
  //     const memberId = imageKnows.memberId || getMemberId;
  //     for (let j = 0; j < images.length; j++) {
  //       const { imageName, imageUrl } = images[j];
  //       const imageDoc = await new Image({
  //         memberId,
  //         imageUrl,
  //         name: imageName,
  //       });
  //       await imageDoc.save();
  //       const imageRateDoc = await new ImageRate({
  //         imageId: imageDoc._id,
  //         first: 0,
  //         entry: 0,
  //         win: 0,
  //         lose: 0,
  //       });
  //       await imageRateDoc.save();
  //       console.log([imageDoc, imageRateDoc]);
  //     };
  //   };
  // };

  // if (created.length === 0) {
  //   createImageAndImageRate(image);
  // } // exports.create End.
  // else {
  //   const createdDataKeys = (image.length === 0) ? [...created] : [...created, "image"];

  //   const createMember = async (membersData, getGroupId, getGenderId) => {
  //     for (let i = 0; i < membersData.length; i++) {
  //       const { memberKnows, members } = membersData[i];
  //       const genderId = memberKnows.genderId || getGenderId;
  //       const groupId =  memberKnows.groupId || getGroupId;
  //       for (let j = 0; j < members.length; j++) {
  //         const { imagesData, memberName } = members[j];
  //         const memberDoc = await new Member({
  //           genderId,
  //           groupId,
  //           name: memberName,
  //         });
  //         await memberDoc.save();
  //         console.log([memberDoc]);
  //         await createImageAndImageRate(imagesData, memberDoc._id);
  //       };
  //     };
  //   };
  //   const createGroup = async (groupsData, getGenderId) => {
  //     for (let i = 0; i < groupsData.length; i++) {
  //       const { groupKnows, groups } = groupsData[i];
  //       const genderId = groupKnows.genderId || getGenderId;
  //       for (let j = 0; j < groups.length; j++) {
  //         const { membersData, groupName } = groups[j];
  //         const groupDoc = await new Group({
  //           genderId,
  //           name: groupName,
  //         });
  //         await groupDoc.save();
  //         console.log([groupDoc]);
  //         await createMember(membersData, groupDoc._id, genderId);
  //       }
  //     };
  //   };
  //   const createGender = async (gendersData) => {
  //     for (let i = 0; i < gendersData.length; i++) {
  //       const { groupsData, genderName } = gendersData[i];
  //       const genderDoc = await new Gender({
  //         name: genderName,
  //       });
  //       await genderDoc.save();
  //       console.log([genderDoc]);
  //       await createGroup(groupsData, genderDoc._id);
  //     };
  //   };

  //   for (let i = 0; i < createdDataKeys.length; i++) {
  //     switch (createdDataKeys[i]) {
  //       case "gender": await createGender(gender); break;
  //       case "group": await createGroup(group); break;
  //       case "member": await createMember(member); break;
  //       case "image": await createImageAndImageRate(image); break;
  //       default: ctx.throw(500, "잘못된 요청입니다.",
  //       {
  //         "errors": [
  //           body,
  //         ],
  //       });
  //     };
  //   }; // exports.create End.
  // };

  //1_test

  //2_test

};
// 게임 결과 로그로 image의 rate update (업데이트 주기 고민)
exports.update = async (ctx) => {
  const { gameValue } = ctx.params;
};