var bunyan = require('bunyan');
var mkdirp = require('mkdirp');

var log;

function getLog(){
    return bunyan.createLogger({
        name: 'myapp',
        streams: [
            {
                level: 'trace',
                stream: process.stdout
            },
            {
                type: 'rotating-file',
                path: 'mongoose-browser-logs/error.log',
                period: '1d',
                count: 10,
                level: 'error'
            },
            {
                type: 'rotating-file',
                path: 'mongoose-browser-logs/app.log',
                period: '1d',
                count: 10,
                level: 'info'
            }
        ]
    });
}

if (!log){
    log = getLog();

    var logsPath = 'mongoose-browser-logs';

    mkdirp(logsPath, function (err) {
        if ( err ) console.log(err)
        else console.log('log saved in ', logsPath)
    });
}

module.exports = log;