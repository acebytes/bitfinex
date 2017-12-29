const WebSocket = require('ws')
const bitfinex = require('./models/bitfinex');
const message = require('./models/message');


function WebSocketClient() {
    this.number = 0;	// Message number
    this.autoReconnectInterval = 5 * 1000;	// ms
}


WebSocketClient.prototype.open = function (url) {
    this.url = url;
    this.instance = new WebSocket(this.url);
    this.instance.on('open', () => {
        this.onopen();
    });
    this.instance.on('message', (data, flags) => {
        this.number++;
        this.onmessage(data, flags, this.number);
    });
    this.instance.on('close', (e) => {
        switch (e) {
            case 1000:	// CLOSE_NORMAL
                console.log("WebSocket: closed");
                break;
            default:	// Abnormal closure
                this.reconnect(e);
                break;
        }
        this.onclose(e);
    });
    this.instance.on('error', (e) => {
        switch (e.code) {
            case 'ECONNREFUSED':
                this.reconnect(e);
                break;
            default:
                this.onerror(e);
                break;
        }
    });
}
WebSocketClient.prototype.send = function (data, option) {
    try {
        this.instance.send(data, option);
    } catch (e) {
        this.instance.emit('error', e);
    }
}
WebSocketClient.prototype.reconnect = function (e) {
    console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`, e);
    this.instance.removeAllListeners();
    var that = this;
    setTimeout(function () {
        console.log("WebSocketClient: reconnecting...");
        that.open(that.url);
    }, this.autoReconnectInterval);
}


WebSocketClient.prototype.onopen = function (e) {
    bitfinex.socketAuth(this);  
}

WebSocketClient.prototype.onmessage = function (data, flags, number) {
   message.parse( data, this );   
}

WebSocketClient.prototype.onerror = function (e) {
    console.log("WebSocketClient: error", arguments);
}

WebSocketClient.prototype.onclose = function (e) {
    console.log("WebSocketClient: closed", arguments);
}


var wsc = new WebSocketClient();
wsc.open(bitfinex.wssUrl);













// function createSocketClient() {

//     var wss = new WebSocket(bitfinex.wssUrl);

//     wss.onmessage = (msg) => {
//         message.parse(msg);
//     }

//     wss.onopen = () => {
//         bitfinex.socketAuth(wss);
//     }

//     wss.onclose = () => {
//         console.log('closed');
//     }

//     wss.onerror = (error) => {
//         console.log('There is a error');
//     }

//     wss.on('error', function (err) {
//         if (err.code != 'ECONNRESET') {
//             // Ignore ECONNRESET and re throw anything else
//             // throw err
//         }
//     })
// }

// try {
//     createSocketClient();
// }
// catch (e) { /* handle error */ }



