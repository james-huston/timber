
var consoleLogger = {};
consoleLogger.log = function(message) {
    console.log('console: ' + message);
}

function messageCallback(err, message) {
    if (err) {
        return;
    }

    for(var i = 0; i < writerArray.length; i++) {
        writerArray[i].log(JSON.stringify(message));
    }
}

listenerArray = new Array();

var boogers = require('./lib/modules/input/http');
var udpListener = require('./lib/modules/input/udp');
listenerArray.push(new boogers(messageCallback));
listenerArray.push(new udpListener(messageCallback));

writerArray = new Array();
writerArray.push(consoleLogger);
var syslogger = require('./lib/modules/output/syslog');
writerArray.push(new syslogger());

function processMessage(message) {
    this.log(message)
}

