/**
 * Listener for http input to json logger.
 * 
 * @author  James Huston <james@jameshuston.net>
 * @since  2012-09-14
 */
var http = require('http');
var qs = require('querystring');
var eventEmitter = require('events').EventEmitter;

exports = module.exports = HttpInputModule;

function HttpInputModule(callback) {
    if (!(this instanceof HttpInputModule)) return new HttpInputModule();

    eventEmitter.call(this);

    this.messageCallback = callback;

    this.startListener();
}

HttpInputModule.prototype = Object.create(eventEmitter.prototype);

HttpInputModule.prototype.startListener = function(listenPort) {
    http.createServer(this.handleRequest.bind(this)).listen(13333);
    console.log('HttpInputModule listening on 13333');
}

HttpInputModule.prototype.handleRequest = function(request, response) {
    var responseString = 'ok';

    var requestVars = require('url').parse(request.url);

    var inputQuery = requestVars.query;

    var inputArray = qs.parse(inputQuery);
    if (inputArray.json) {
        var cleanString = qs.unescape(inputArray.json);

        var jsonArray = new Array();
        try {
            jsonArray = JSON.parse(cleanString);
            this.emit('logArray', jsonArray);
            this.messageCallback(null, jsonArray);
        } catch(err) {
//            console.error(err);
            console.error(err.stack);
            //this.messageCallback(err);
        }

//        console.log(JSON.stringify(jsonArray));
    } else {
        responseString = 'failed';
    }

    request.on('end', function() {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(responseString);
    });
}

