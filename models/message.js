const unicoin = require('../gateway/unicoin');
const loggerHeartbeats = require('../logger/heartbeat');
const loggerMessages = require('../logger/message');
const randomstring = require("randomstring");

const url = '/api/v1/callback/buy';

module.exports.parse = (msg) => {
    var request_id = randomstring.generate(20);
    var data = JSON.parse(msg);

    if (data[1] == 'hb') {
        loggerHeartbeats.write('Heart Beating <3... take a big breath... :)');
    } else {

        // console.log(msg);
        loggerMessages.write(request_id + ' - ' + JSON.stringify(data));

        if (data[1] == 'on' || data[1] == 'oc' || data[1] == 'ou') {
            
            loggerMessages.write(request_id + ' - ' + 'Request sent to: ' + url);

            unicoin.sendRequest(url, data, function (err, response) {
                // console.log(response);
                loggerMessages.write(request_id + ' - Error: ' + err);
                loggerMessages.write(request_id + ' - ' + response);
            });
        }
    }
}