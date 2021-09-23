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

const postDoc = async (model, schema) => {
  const temp = await new model(schema);
  await temp.save();
  return temp;
};

// 랜덤 아이디
const makeIds = (v) => Array.from({ length: v }, (_, i) => i);
const getRandomFromLength = (arr, length) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, length);
};

// 퀵 정렬
const swap = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};
const partition = (by, arr, left, right) => {
  const pivot = arr[Math.floor((left + right) / 2)][by]; // 물리적으로 중간을 pivot로 정한다.

  while (left <= right) { // 교차 지점이 오기 전까지
    while (arr[left][by] > pivot) left++; // arr의 왼쪽에서 pivot보다 작거나 같은 값을 찾는다. left = 1
    while (arr[right][by] < pivot) right--; // arr의 오른쪽에서 pivot보다 크거나 같은 값을 찾는다. right = 3

    if (left <= right) { // 교차 되기 전이라면
      swap(arr, left, right); // pivot 보다 크거나 같은값과, 작거나 같은값을 swap 한다.
      left++; // 그 다음 search를 위해서 left 1증가 left = 2
      right--; // right 1감소 right = 2
    };
  };

  return left; // 교차되고 난후 left를 그 다음 index로 리턴한다. 
};
const quickSortAndSlice = (requestLength, by, arr, left = 0, right = arr.length - 1) => { // 초기값: 배열의 시작과 끝
  if (left >= right) return; // ending condition

  let index = partition(by, arr, left, right);
  quickSortAndSlice(requestLength, by, arr, left, index - 1); // index의 왼쪽
  quickSortAndSlice(requestLength, by, arr, index, right); // index의 오른쪽

  return arr.slice(0, requestLength);
};

// 원하는 갯수만큼 선택정렬
const selectionSort = (requestLength, by, arr) => {
  let temp = [];
  let rates = arr.map(rate => rate[by]);

  for (let i = 0; i < requestLength && arr.length > 0; i++) {
    const targetIndex = rates.findIndex(rate => rate === Math.max.apply(null, rates));
    rates.splice(targetIndex, 1);

    temp.push(...arr.splice(targetIndex, 1));
  };

  return temp;
};

// schema props 필요 없는 듯....
const models = {
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
    schema: ({ groupId, imageUrl, name }) => ({ groupId, imageUrl, name }),
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
    schema: ({ memberId, imageUrl, name }) => ({ memberId, imageUrl, name }),
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

// axios.get(/images/member || group/gender/howManyImages)
// return imageUrl, imageRateId, group, member ? member || null;
exports.getImages = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { imageType, genderType, howManyImages } = ctx.params;

  let images = [];

  try {
    if ([imageType, `${imageType}Image`, `${imageType}ImageRate`].some(t => !models.hasOwnProperty(t))) {
      return ctx.throw(404,
        "요청한 imageCollection 은 없는 imageCollection 입니다.",
        {
          "errors": [
            {
              "imageCollection": imageType,
            }
          ]
        }
      );
    };

    const targetModel = models[imageType].model;
    const targetImageModel = models[`${imageType}Image`].model;
    const targetImageRateModel = models[`${imageType}ImageRate`].model;
    const ID = `${imageType}Id`;
    const IMAGEID = `${imageType}ImageId`;
    const IMAGERATEID = `${imageType}ImageRateId`;

    const genderDoc = await Gender.findOne({ name: genderType }, (err, genderData) => {
      if (err) return ctx.throw(500, err);
      if (!genderData) ctx.throw(404,
        "존재하지 않는 성별 입니다.",
        {
          "errors": [
            {
              "genderType": genderType,
            }
          ]
        }
      );
    });
    
    const targetDocs =  await targetModel.find({ genderId: genderDoc._id }, (err, targetData) => {
      if (err) return ctx.throw(500, err);
      if (!targetData) ctx.throw(404,
        `해당 성별에 부합하는 ${imageType} 이/가 없습니다`,
        {
          "errors": [
            {
              "genderType": gender,
              "imageType": imageType,
            }
          ]
        }
      );
    });

    const targetImages = await Promise.all(targetDocs.map(async ({ _id, name }) => {
      let imageFilter = {};
      imageFilter[ID] = _id;

      const targetImageDocs = await targetImageModel.find(imageFilter, (err, targetImageData) => {
        if (err) return ctx.throw(500, err);
        if (!targetImageData) ctx.throw(404,
          `${genderType} 성별의 ${name} 에 해당하는 이미지가 없습니다.`,
          {
            "errors": [
              {
                "genderType" : genderType,
                "name": name,
              }
            ]
          }
        );
      });
      const targetImage = targetImageDocs[Math.floor(Math.random() * targetImageDocs.length)];
      const { _id: targetImageId, name: targetImageName, imageUrl } = targetImage;

      let imageRateFilter = {};
      imageRateFilter[IMAGEID] = targetImageId;

      const targetImageRateDoc = await targetImageRateModel.findOne(imageRateFilter, async (err, targetImageRateData) => {
        if (err) return ctx.throw(500, err);
        if (!targetImageRateData) {
          let targetImageRateSchema = {
            first: 0,
            entry: 0,
            win: 0,
            lose: 0,
          };
          targetImageRateSchema[IMAGEID] = targetImageId;
          await postDoc(targetImageRateModel, targetImageRateSchema);
        };
      });
      const targetImageRate = targetImageRateDoc || await targetImageRateModel.findOne(imageRateFilter, (err, targetImageRateData) => {
        if (err) return ctx.throw(500, err);
        if (!targetImageRateData) ctx.throw(404,
          `imageRateCollection 검색 자체에 문제가 발생했습니다. 개발팀에 문의해주세요.`,
          {
            "errors": [
              {
                "requestType": "get",
                "imageType": imageType,
                "genderType": genderType,
                "howManyImages": howManyImages,
                "name": name,
                "targetImageId": targetImageId,
                "targetImageName": targetImageName,
                "imageUrl": imageUrl,
                imageRateFilter,
              }
            ]
          }
        );
      });

      let image = {
        name: targetImageName,
        imageUrl,
      };
      image[IMAGERATEID] = targetImageRate._id;

      return image;
    }));

    if (howManyImages > targetImages.length) {
      return ctx.throw(400,
        `${imageType}Image 의 수가 요청한 이미지 수보다 적습니다.`,
        {
          "errors": [
            {
              "images": targetImages,
              "imagesLength": targetImages.length,
              "requestImagesLength": howManyImages,
            }
          ]
        }
      );
    };

    images = getRandomFromLength(targetImages, howManyImages);
  } catch (e) {
    return ctx.throw(500, e);
  }

  ctx.body = images;
};

// axios.get(/rates/:imageType/:genderType/:requestLength)
exports.getRates = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { imageType, genderType, requestLength } = ctx.params;

  let ratedImageRates = {};
  try {
    if ([imageType, `${imageType}Image`, `${imageType}ImageRate`].some(t => !models.hasOwnProperty(t))) {
      return ctx.throw(404,
        "잘못된 imageType 입니다.",
        {
          "errors": [
            {
              "imageType": imageType,
            }
          ]
        }
      );
    };

    const targetModel = models[imageType].model;
    const targetImageModel = models[`${imageType}Image`].model;
    const targetImageRateModel = models[`${imageType}ImageRate`].model;
    const ID = `${imageType}Id`;
    const IMAGEID = `${imageType}ImageId`;

    const genderDoc = await Gender.findOne({ name: genderType }, (err, genderData) => {
      if (err) return ctx.throw(500, err);
      if (!genderData) ctx.throw(404,
        "존재하지 않는 성별 입니다.",
        {
          "errors": [
            {
              "genderType": genderType,
            }
          ]
        }
      );
    });

    const targetDocs =  await targetModel.find({ genderId: genderDoc._id }, (err, targetData) => {
      if (err) return ctx.throw(500, err);
      if (!targetData) ctx.throw(404,
        `해당 성별에 부합하는 ${imageType} 이/가 없습니다`,
        {
          "errors": [
            {
              "genderType": gender,
              "imageType": imageType,
            }
          ]
        }
      );
    });

    const targetImageRates = await Promise.all(targetDocs.map(async ({ _id, name }) => {
      let imageFilter = {};
      imageFilter[ID] = _id;

      const targetImageDocs = await targetImageModel.find(imageFilter, (err, targetImageData) => {
        if (err) return ctx.throw(500, err);
        if (!targetImageData) ctx.throw(404,
          `${genderType} 성별의 ${name} 에 해당하는 이미지가 없습니다.`,
          {
            "errors": [
              {
                "genderType" : genderType,
                "name": name,
              }
            ]
          }
        );
      });
      const targetImageRateDocs = await Promise.all(targetImageDocs.map(async ({ _id }) => {
        let imageRateFilter = {};
        imageRateFilter[IMAGEID] = _id;

        const targetImageRateDoc = await targetImageRateModel.findOne(imageRateFilter, async (err, targetImageRateData) => {
          if (err) return ctx.throw(500, err);
          if (!targetImageRateData) {
            let targetImageRateSchema = {
              first: 0,
              entry: 0,
              win: 0,
              lose: 0,
            };
            targetImageRateSchema[IMAGEID] = targetImageId;
            await postDoc(targetImageRateModel, targetImageRateSchema);
          };
        });
        const targetImageRate = targetImageRateDoc || await targetImageRateModel.findOne(imageRateFilter, (err, targetImageRateData) => {
          if (err) return ctx.throw(500, err);
          if (!targetImageRateData) ctx.throw(404,
            `imageRateCollection 검색 자체에 문제가 발생했습니다. 개발팀에 문의해주세요.`,
            {
              "errors": [
                {
                  "requestType": "get",
                  "imageType": imageType,
                  "genderType": genderType,
                  "howManyImages": howManyImages,
                  "name": name,
                  "targetImageId": targetImageId,
                  "targetImageName": targetImageName,
                  "imageUrl": imageUrl,
                  imageRateFilter,
                }
              ]
            }
          );
        });

        return targetImageRate;
      }));
      const targetImageMergedRate = targetImageRateDocs.reduce((acc, { first, entry, win, lose }) => {
        acc.first += first;
        acc.entry += entry;
        acc.win += win;
        acc.lose += lose;

        return acc;
      }, { first: 0, entry: 0, win: 0, lose: 0 });
      const { first, entry, win, lose } = targetImageMergedRate;

      let firstRate = entry === 0 ? -1 : Number(((first * 100) / entry).toFixed(2));
      let winRate = win + lose === 0 ? -1 : Number(((win * 100) / (win + lose)).toFixed(2));

      let rates = {
        firstRate,
        winRate,
      };
      rates[ID] = _id;

      return rates;
    }));

    // 정렬 후 requestLength 만큼 slice.
    const ratedByFirstRate = quickSortAndSlice(requestLength, "firstRate", [...targetImageRates]);
    const ratedByWinRate = quickSortAndSlice(requestLength, "winRate", [...targetImageRates]);

    // requestLength 만큼의 상위 데이터 추출
    // const ratedByFirstRate = selectionSort(requestLength, "firstRate", [...targetImageRates]);
    // const ratedByWinRate = selectionSort(requestLength, "winRate", [...targetImageRates]);

    ratedImageRates = { ratedByFirstRate, ratedByWinRate };
  } catch (e) {
    return ctx.throw(500, e);
  };

  ctx.body = ratedImageRates;
};

// axios.get(/thumbnail/:imageType/:genderType)
// return [url, length];
exports.getThumbnail = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { imageType, genderType } = ctx.params;

  try {
    if ([imageType, `${imageType}Image`].some(t => !models.hasOwnProperty(t))) {
      return ctx.throw(404,
        "잘못된 imageType 입니다.",
        {
          "errors": [
            {
              "imageType": imageType,
            }
          ]
        }
      );
    };

    const targetModel = models[imageType].model;
    const targetImageModel = models[`${imageType}Image`].model;
    const TARGETID = `${imageType}Id`;

    const genderDoc = await Gender.findOne({ name: genderType }, (err, genderData) => {
      if (err) return ctx.throw(500, err);
      if (!genderData) ctx.throw(404,
        "존재하지 않는 성별 입니다.",
        {
          "errors": [
            {
              "genderType": genderType,
            }
          ]
        }
      );
    });

    const targetDocs =  await targetModel.find({ genderId: genderDoc._id }, (err, targetData) => {
      if (err) return ctx.throw(500, err);
      if (!targetData) ctx.throw(404,
        `해당 성별에 부합하는 ${imageType} 이/가 없습니다`,
        {
          "errors": [
            {
              "genderType": gender,
              "imageType": imageType,
            }
          ]
        }
      );
    });

    let filter = {};
    filter[TARGETID] = targetDocs[Math.floor(Math.random() * targetDocs.length)]._id;
    const targetImageDocs = await targetImageModel.find(filter, (err, targetImageData) => {
      if (err) return ctx.throw(500, err);
    });
    if (targetImageDocs.length === 0) ctx.throw(404,
      `해당 아이돌 / 그룹 의 이미지가 없습니다`,
      {
        "errors": [
          {
            "genderType": genderType,
            "imageType": imageType,
            "filter": filter,
          }
        ]
      }
    );

    const thumbnailUrl = targetImageDocs[Math.floor(Math.random() * targetImageDocs.length)].imageUrl;

    ctx.body = [thumbnailUrl, targetImageDocs.length];
  } catch (error) { return ctx.throw(500, error); };
};

// 공용

// axios.get("/collections/:option")
exports.getCollections = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { option } = ctx.params;
  const targetModels = option === "all" ? Object.keys(models) : [option];

  let targetDocs = {};
  await Promise.all(targetModels.map(async (e) => {
    let targetDoc = await models[e].model.find();
    if (targetDoc.length === 0) targetDoc = [];

    targetDocs[e] = targetDoc;
  }));

  ctx.body = targetDocs;
};

// axios.post("/documents/:option", body)
exports.postDocuments = async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  const { option } = ctx.params;
  const data = ctx.request.body;

  let results = [];

  try {
    if (!models.hasOwnProperty(option)) {
      return ctx.throw(404,
        "요청한 collection 은 없는 collection 입니다.",
        {
          "errors": [
            {
              "targetCollection": option,
              "body": data,
            }
          ]
        }
      );
    };
    
    const targetModel = models[option].model;
    const targetDocs = data.map(async (e) => (await postDoc(targetModel, e)));
    results = await Promise.all(targetDocs);
  } catch (error) { ctx.throw(500, e); };

  ctx.body = results;
};

// 게임 결과 로그로 image의 rate update (업데이트 주기 고민)
exports.update = async (ctx) => {
  const { gameValue } = ctx.params;
};