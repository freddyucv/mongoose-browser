"use strict";
let DataBaseManeger = require('./database');
let router = require('koa-router')();
var logger = require('./util/logger');

module.exports = class DefaultCrudController{
  constructor(modelsPath, mongodbUrl){
    let dataBaseModels = new DataBaseManeger(modelsPath, mongodbUrl);
    let self = this;

    dataBaseModels.models.done((m) => {
      self.models = m;
      logger.info('database models created');
    });
  }

  get routes(){
    let self = this;

    router.post('/sendCommand',
      function *() {
        let data = this.request.body;

        let dbObject =  self.getDBObject(data.object, data.model);
        let response = yield self.executeCommand(dbObject, data.commands);

        this.body = response.body;
        this.status = response.status;
      });

     return router.routes();
  }

  getDBObject (object, model){
    
    let dbObject = new this.models[model]();
    let property;

    for (property in object){
      dbObject[property] = object[property];
    }

    return dbObject;
  }

  *executeCommand (object, commands){
    return new Promise((resolve) => {
      logger.info(`execute ${JSON.stringify(commands)} in ${object}`);

      let currentObject = object;
      let nCommands =  commands.length;

      for (let i = 0; i < nCommands - 1; i++){
        let command = commands[i];
        currentObject = currentObject[command.command]( command.parameters );
      }

      let lastCommand = commands[nCommands - 1];

      currentObject[lastCommand.command]((err, docs) => {

        if (!err){
          resolve({status: 200, body: docs});
        }else{
          logger.error('ERROR:', err.message);
          resolve({status: 500, body: err});
        }
      });
    });
  }
};
