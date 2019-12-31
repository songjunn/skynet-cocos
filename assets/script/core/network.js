var ByteBuffer = require('bytebuffer');

var Network = {
    _url: '',
    _sock: null,
    _connected: false,
    _reconnnum: 0,
    _callbacks: {},
};

module.exports = Network;

Network.connect = function(url, cb_ok, cb_fail) {
    var self = this;
    this._url = url;
    this._sock = new WebSocket('ws://'+url);
    this._sock.binaryType = 'arraybuffer';
    this._sock.onopen = function() {
        noticelog('net connect success: '+url);
        self._reconnnum = 0;
        self._connected = true;
        if (cb_ok) {
            cb_ok();
        }
    };
    this._sock.onmessage = function(event) {
        let sz = event.data.byteLength;
        let bb = ByteBuffer.wrap(event.data, true);
        let type = bb.readInt32();
        let data = bb.toBuffer();

        debuglog('net recv size='+sz+' type='+type);

        if (self._callbacks[type]) {
            self._callbacks[type](data);
        }
    };
    this._sock.onclose = function() {
        self._sock = null;
        self._connected = false;
        self._reconnnum++;
        if (self._reconnnum < 3) {
            self.connect(self._url, cb_ok, cb_fail);
        } else {
            if (cb_fail) {
                cb_fail();
            }
        }
    };
    this._sock.onerror = function() {
        noticelog('net error.');
    };
}

Network.reconnect = function(cb_ok, cb_fail) {
    this.connect(this._url, cb_ok, cb_fail);
}

Network.close = function () {
    if (this._sock) {
        this._sock.close();   
    }
}

Network.send = function (type, msg) {
    let sz = 4 + msg.length;
    let bb = new ByteBuffer(sz);
    bb.writeInt32(type);
    bb.append(msg);
    bb.flip();

    try {
        this._sock.send(bb.toBuffer());
        debuglog('net send size=' + sz);
    } catch (error) {
        errorlog('net send error:' + error);
    }
}

Network.regist = function (type, func) {
    if (this._callbacks[type]) {
        errorlog('net regist message callback repeated='+type);
    }
    this._callbacks[type] = func;
}

Network.unregist = function (type) {
    this._callbacks[type] = null;
}

Network.request = function (type, msg, func) {
    let self = this;
    this.regist(type+1, function(data) {
        func(data);
        self.unregist(type+1);
    });
    this.send(type, msg);
}
