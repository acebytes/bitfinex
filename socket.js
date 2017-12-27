const WebSocket = require('ws')
const bitfinex = require('./models/bitfinex');
const crypto = require('crypto-js');

const wss = new WebSocket(bitfinex.wssUrl);

wss.onmessage = (msg) => {
    
    console.log(msg.data);

    data = JSON.parse(msg.data);
   
    if (data[1] == 'hb') {
        console.log("Heart Beating <3");
    }

    if (data[1] == 'on') {
        console.log("on request received");
    }

    if (data[1] == 'oc') {
        console.log("oc request received");
    }

    if (data[1] == 'ou') {
        cosole.log("ou request received");
    }

}
wss.onopen = () => {

    const apiKey = bitfinex.apiKey;
    const apiSecret = bitfinex.apiSecret;

    const authNonce = Date.now() * 1000
    const authPayload = 'AUTH' + authNonce
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