const serverless = require('serverless-http');
const app = require('../../express/server.js');

module.exports.handler = serverless(app);
