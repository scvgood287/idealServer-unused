const Router = require('koa-router');

const ideals = new Router();
const idealsCtrl = require('./ideals.controller');

// 유저 클라
ideals.get('/images/:gameValue/:roundValue', idealsCtrl.getIdealsImages);
ideals.get('/rate/:gameValue/:showUp', idealsCtrl.getRatedList);
ideals.post('/log', idealsCtrl.uploadLog);

// 이미지 업로드 용 클라
ideals.get('/collections', idealsCtrl.getCollections);
ideals.post('/documents', idealsCtrl.createDocuments);
ideals.post('/images', idealsCtrl.uploadImages);

module.exports = ideals;