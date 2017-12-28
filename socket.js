const WebSocket = require('ws')
const bitfinex = require('./models/bitfinex');
const crypto = require('crypto-js');
const unicoin = require('./gateway/unicoin');
const loggerHeartbeats = require('./logger/heartbeat');
const loggerMessages = require('./logger/message');
const randomstring = require("randomstring");

const wss = new WebSocket(bitfinex.wssUrl);


wss.onmessage = (msg) => {

    request_id = randomstring.generate(20);
    data = JSON.parse(msg.data);

    if (data[1] == 'hb') {
        loggerHeartbeats.write('Heart Beating <3... take a big breath... :)');
    } else {

        // console.log(msg);
        loggerMessages.write(request_id + ' - ' + JSON.stringify(data));

        if (data[1] == 'on' || data[1] == 'oc' || data[1] == 'ou') {

            url = '/api/v1/callback/buy';
            loggerMessages.write(request_id + ' - ' + 'Request sent to: ' + url);

            unicoin.sendRequest(url, data, function (err, response) {
                // console.log(response);
                loggerMessages.write(request_id + ' - Error: ' + err);
                loggerMessages.write(request_id + ' - ' + response);
            });
        }
    }

}
wss.onopen = () => {

    const apiKey = bitfinex.apiKey;
    const apiSecret = bitfinex.apiSecret;

    const authNonce = Date.now() * 1000;
    const authPayload = 'AUTH' + authNonce;
    const authSig = crypto
        .HmacSHA384(authPayload, apiSecret)
        .toString(crypto.enc.Hex)

    const payload = {
        apiKey,
        authSig,
        authNonce,
        authPayload,
        event: 'auth'
    }

    wss.send(JSON.stringify(payload));

    wss.send(JSON.stringify({
        "event": "ping"
    }));

    //  wss.send(JSON.stringify({
    //     "event":"subscribe",
    //     "channel":"CHANNEL_NAME"
    //  }));

}