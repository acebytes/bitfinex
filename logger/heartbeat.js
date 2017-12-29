var moment = require('moment');

function HeartbeatLogger() {
    this.log = null;
    this.init = function(){
        const SimpleNodeLogger = require('simple-node-logger'),
    
            opts = {
                logFilePath: 'logs/heartbeats/heartbeats-' + moment().format("Y-MM-DD") + '.log',
                timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
            };
    
        this.log = SimpleNodeLogger.createSimpleLogger(opts);       
    };

    this.write = function(str){
        this.log.info(str);
    }
}

module.exports = new HeartbeatLogger();