"use strict";

let router = require('koa-router')();
let modelName = require('./../util/model-name');
let logger = require('./../util/logger');

class CustomTagListServer{
    create( modelPath ) {
        let model = require( modelPath );
        let mName = modelName( modelPath );

        logger.info(`creating custom tag list to : ${mName}...`);

        router.get(`/${mName}`, function *(){
            this.body = model;
        });

        logger.info(`created custom tag list to ${mName} visit /${mName}`);
    }

    get routes(){
        return router.routes();
    }
};

module.exports = new CustomTagListServer();