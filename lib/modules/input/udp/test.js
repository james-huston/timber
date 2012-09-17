var dgram = require("dgram");

var messageObject = {
    "message": "blarg!"
    ,"timestamp": Date.now()
}

var messageString = JSON.stringify(messageObject)

var message = new Buffer(messageString);
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 13334, "localhost", function(err, bytes) {
    client.close();
});