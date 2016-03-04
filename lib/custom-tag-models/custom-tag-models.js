"use strict";

let ls = require('list-directory-contents');
let logger = require('./../util/logger');
let customTagListServer = require('./custom-tag-list-server');

module.exports = class CustomTagServer{
    constructor (modelsPath, app){
        logger.info('creating custom tag server...');


        ls(modelsPath, function (err, tree) {
            tree.forEach(function(fileFullPath){
                if (fileFullPath.match('_model.js$')){
                    customTagListServer.create( fileFullPath );
                }
            });

        });

        logger.info('custom tag server was created');
    }

    get routes(){
        return customTagListServer.routes;
    }
};