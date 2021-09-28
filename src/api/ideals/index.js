const Router = require('koa-router');

const ideals = new Router();
const idealsCtrl = require('./ideals.controller');

// 유저 클라
ideals.get('/images/:imageType/:genderType/:howManyImages', idealsCtrl.getImages);
ideals.get('/rates/:imageType/:genderType/:top', idealsCtrl.getRates);
ideals.get('/thumbnail/:imageType/:genderType', idealsCtrl.getThumbnail);

// 공용
ideals.get('/collections/:option', idealsCtrl.getCollections);
ideals.post('/documents/:option', idealsCtrl.postDocuments);

module.exports = ideals;