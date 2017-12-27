const request = require('request')
const crypto = require('crypto')

var apiKey = 'OzQtPN3A3yjpx0lumfDoNpWkEUzhV3bI7mUlQTazfRo';
var apiSecret = 'Dn5h1EQbhuFwjQ3W1ut61XOneAP1gSB9HEXoO83fnsi';
var baseUrl = 'http://api.unicoin.ge'

module.exports.apiKey = apiKey;
module.exports.apiSecret = apiSecret;
module.exports.baseUrl = baseUrl;

///api/v1/callback/buy
module.exports.sendRequest = ( url, body, callback ) => {

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
            callback(error, body);
      
            // var a = 1;
      
        }
    );

};

