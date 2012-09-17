var dgram = require("dgram");

exports = module.exports = UdpInputModule;

function UdpInputModule(messageCallback) {
    this.messageCallback = messageCallback;
    this.startListener();
}

UdpInputModule.prototype.startListener = function() {
    var self = this;

    var server = dgram.createSocket("udp4");

    server.on("message", function (msg, rinfo) {
        self.messageCallback(null, msg);
    });

    server.on('error', function(error) {
        self.messageCallback(error);
    });

    server.on("listening", function () {
        var address = server.address();
        console.log("UdpInputModule listening " +
            address.address + ":" + address.port);
    });

    server.bind(13334);
}
    