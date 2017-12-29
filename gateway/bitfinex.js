const request = require('request')
const crypto = require('crypto')
const config = require('../config/config');

var apiKey = config.apiKey;
var apiSecret = config.apiSecret;
var wssUrl = config.wssUrl;
var baseUrl = config.baseUrl;

module.exports.apiKey = apiKey;
module.exports.apiSecret = apiSecret;
module.exports.baseUrl = baseUrl;
module.exports.wssUrl = wssUrl;

module.exports.sendRequest = (body, callback) => {

    var url = body.request;

    var nonce = Date.now().toString()
    var completeURL = baseUrl + url

    var payload = new Buffer(JSON.stringify(body))
        .toString('base64')

    var signature = crypto
        .createHmac('sha384', apiSecret)
        .update(payload)
        .digest('hex')

    var options = {
        url: completeURL,
        headers: {
            'X-BFX-APIKEY': apiKey,
            'X-BFX-PAYLOAD': payload,
            'X-BFX-SIGNATURE': signature
        },
        body: JSON.stringify(body)
    }

    request.post(
        options,
        function (error, response, body) {
            callback(error, JSON.parse(body));
        }
    );

};

