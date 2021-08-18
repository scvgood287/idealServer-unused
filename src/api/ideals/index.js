const Router = require('koa-router');

const ideals = new Router();
const idealsCtrl = require('./ideals.controller');

// 유저 클라
ideals.get('/getIdealsImages/:gameValue/:roundValue', idealsCtrl.getIdealsImages);
ideals.get('/getRatedList/:gameValue/:showUp', idealsCtrl.getRatedList);
ideals.post('/uploadLog', idealsCtrl.uploadLog);

// 이미지 업로드 용 클라
ideals.get('/getCollections', idealsCtrl.getCollections);
ideals.post('/createDocuments/:targetCollection', idealsCtrl.createDocuments);
ideals.post('/uploadImages', idealsCtrl.uploadImages);

module.exports = ideals;