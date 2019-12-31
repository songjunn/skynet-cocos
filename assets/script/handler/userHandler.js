var network = require('network');
var MessageTypeDefine = require('MessageTypeDefine_pb');
var MessageUser = require('MessageUser_pb');

var UserHandler = {
	userId: 0,
};

module.exports = UserHandler;

UserHandler.registMessage = function() {
	var self = this;
	network.regist(MessageTypeDefine.MsgDefine.S2C_USER_LOGIN, function(data) {
        debuglog('recv data: ' + data);
        let message = proto.Message.S2CUserInfo.deserializeBinary(data);
        debuglog('recv proto: ' +message);
        self.userId = message.getUserid();
        debuglog('userid='+message.getUserid());
    });
}

UserHandler.requestLogin = function() {
	let message = new MessageUser.C2SGuestLogin();
    message.setUuid('test001');
    network.send(MessageTypeDefine.MsgDefine.C2S_GUEST_LOGIN, message.serializeBinary());
}