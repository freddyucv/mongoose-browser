module.exports = function(opts){
  var app = opts.app;
  var modelsPath = opts.models;
  var mongodbUrl = opts.mongodb_url;

  var DefaultCrudController = require('./lib/default-crud-controller');
  var ClientModelServer = require('./lib/client-models-server');
  var logger = require('./lib/util/logger');

  var crudController = new DefaultCrudController(modelsPath, mongodbUrl);
  var clientModelsServer = new ClientModelServer(modelsPath);

  logger.info('Starting mongoose client...');

  var jsonBody = require('koa-json-body');

  app.use(jsonBody());
  app.use(crudController.routes);
  app.use(clientModelsServer.routes);

  logger.info('Started mongoose client...');
}
