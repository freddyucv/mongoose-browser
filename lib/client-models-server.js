"use strict";

let browserify = require('browserify')();
let router = require('koa-router')();
let ls = require('list-directory-contents');
let modelName = require('./util/model-name');
let fs = require('fs');
let Readable = require('stream').Readable;
var logger = require('./util/logger');

module.exports = class ClientModelServer{
  constructor (modelsPath){
    logger.info('creating models for the browser');
    let clientModelFileContent = 'var models = {};';

    let self = this;

    ls(modelsPath, function (err, tree) {
      tree.forEach(function(fileFullPath){
        if (fileFullPath.match('_model.js$')){
          logger.info(`processing ${fileFullPath}`);
          let mN = modelName( fileFullPath );
          clientModelFileContent += `models["${mN}"] = require("${fileFullPath}");`
          ;
        }
      });

      clientModelFileContent += 'module.exports = models;';

      let streamReadable = new Readable();
      streamReadable.push(clientModelFileContent);
      streamReadable.push(null);

      browserify.require(streamReadable, {expose: 'models', baseDir: './dist'});
      browserify.bundle((err, buff) =>
        self.browserifyClientModelFileContent = buff.toString());
    });

    logger.info('the models for the browser was created');
  }

  get routes(){
    let self = this;

    router.get('/models-client.js',
      function *(next) {
        this.body = self.browserifyClientModelFileContent;
        yield next;
      });

     return router.routes();
  }
}
