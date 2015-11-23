var koa = require('koa');
var clientMongoose = require('../index.js');
var serve = require('koa-static');

var app = koa();

clientMongoose({
  app: app,
  models: __dirname +  '/models',
  mongodb_url: 'mongodb://freddyucv:leones2009@ds051923.mongolab.com:51923/musci_example'
});

app.use(serve(__dirname));
app.use(serve('../'));

app.listen(process.env.PORT | 1234);
