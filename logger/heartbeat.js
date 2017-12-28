var moment = require('moment');

module.exports.write = (str) => {
    const SimpleNodeLogger = require('simple-node-logger'),

        opts = {
            logFilePath: 'logs/heartbeats/heartbeats-' + moment().format("Y-MM-DD") + '.log',
            timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
        },

    log = SimpleNodeLogger.createSimpleLogger(opts);
    log.info(str);
}