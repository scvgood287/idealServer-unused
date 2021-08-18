const Router = require('koa-router');

const api = new Router();
const ideals = require('./ideals');

api.use('/ideals', ideals.routes())

module.exports = api;