"use strict";

let router = require('koa-router')();
let modelName = require('./../util/model-name');
let logger = require('./../util/logger');
let mustacheTemplateLoader = require('./../util/mustache-template-loader');

class CustomTagListServer{

    create( modelPath ) {
        let model = require( modelPath );
        let mName = modelName( modelPath );

        logger.info(`creating custom tag list to : ${mName}...`);

        model.modelName = mName;
        model.properties = this.getProperties( model );

        let context = {
            model: model
        };

        console.log('MODEL ', model);

        router.get(`/${mName}`, function *(){
            this.type = 'text/html';
            this.body = mustacheTemplateLoader( __dirname + '/list-template/index.html', context );
        });

        router.get(`/list-${mName}.html`, function *(){
            this.type = 'text/html';
            this.body = mustacheTemplateLoader( __dirname + '/list-template/list-template.html', context );
        });

        logger.info(`created custom tag list to ${mName} visit /${mName}`);
    }

    get routes(){
        return router.routes();
    }

    getProperties( model ){
        var columns = [];

        for (var property in model.tree){
            var propertyObject = model.tree[ property ];
            propertyObject = propertyObject.length > 0 ? propertyObject[0] : propertyObject;

            if (propertyObject) {
                propertyObject.name = property;
                propertyObject.label = propertyObject.label ? propertyObject.label : propertyObject.name;
                columns.push( propertyObject );
            }
        }

        return columns;
    }
};

module.exports = new CustomTagListServer();