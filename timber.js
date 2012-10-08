
var consoleLogger = {};

consoleLogger.log = function(message) {
    console.log('console: ' + message);
}

function messageCallback(err, message) {
    if (err) {
        return;
    }

    var messageString = '';

    if (Buffer.isBuffer(message)) {
        messageString = message.toString();
    } else if (typeof message === 'object') {
        messageString = message.toString();
    }

    for(var i = 0; i < writerArray.length; i++) {
        writerArray[i].log(messageString);
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

