var Syslog = require('node-syslog');

exports = module.exports = SyslogOutputModule;

function SyslogOutputModule() {
}

SyslogOutputModule.prototype.log = function(message) {
    if (typeof message  == 'string') {
        Syslog.init("node-syslog", Syslog.LOG_PID | Syslog.LOG_ODELAY, Syslog.LOG_LOCAL0);
        Syslog.log(Syslog.LOG_ALERT, 'Timber ' + Date.now() + " " + message);
        Syslog.close();
    } else {
        Syslog.init("node-syslog", Syslog.LOG_PID | Syslog.LOG_ODELAY, Syslog.LOG_LOCAL0);
        Syslog.log(Syslog.LOG_ALERT, 'Timber ' + Date.now() + " " + JSON.stringify(message));
        Syslog.close();
    }
}

