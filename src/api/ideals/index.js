const Router = require('koa-router');

const ideals = new Router();
const idealsCtrl = require('./ideals.controller');

// 유저 클라
ideals.get('/images/:imageType/:genderType/:howManyImages', idealsCtrl.getImages);
ideals.get('/rates/:imageType/:genderType/:requestLength', idealsCtrl.getRates);

// 이미지 업로드 용 클라
ideals.get('/collections', idealsCtrl.getCollections);
ideals.post('/documents', idealsCtrl.postDocuments);

module.exports = ideals;