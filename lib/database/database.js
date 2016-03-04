"use strict";

let Promise = require('promise');
let mongoose = require('mongoose');
let modelName = require('./../util/model-name');
let ls = require('list-directory-contents');
var logger = require('./../util/logger');

module.exports = class DataBaseManager {

  constructor(modelsPath, mongodbUrl){
    this.modelsPath = modelsPath;
    this.connect = mongoose.connect(mongodbUrl);
    logger.info(`connected to: ${mongodbUrl}`);
  }

  get models(){
    return new Promise( (cb) => {
      let modelsDB = {};

      ls(this.modelsPath, function (err, tree) {
        tree.forEach(function(fileFullPath){

          if (fileFullPath.match('_model.js$')){
            let mN = modelName(fileFullPath);
            let model =  require(fileFullPath);
            modelsDB[mN] =  mongoose.model(mN, model);
          }
        });

        cb(modelsDB);
      });
    });
  }
};
