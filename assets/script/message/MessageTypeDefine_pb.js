// source: MessageTypeDefine.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.Message.MsgDefine', null, global);
/**
 * @enum {number}
 */
proto.Message.MsgDefine = {
  S2C_MSG_BEGIN: 0,
  S2C_COMMON_ERROR: 50,
  S2C_COMMON_NOTICE: 51,
  S2C_COMMON_BROADCAST: 52,
  S2C_USER_LOGIN: 100,
  S2C_USER_LOGOUT: 101,
  S2C_USER_HEARTBEAT: 102,
  S2C_USER_INFO: 103,
  S2C_MSG_END: 9999,
  C2S_MSG_BEGIN: 10000,
  C2S_GUEST_LOGIN: 10001,
  C2S_USER_LOGIN: 10002,
  C2S_USER_LOGOUT: 10003,
  C2S_USER_HEARTBEAT: 10004,
  C2S_MSG_END: 30000
};

goog.object.extend(exports, proto.Message);
