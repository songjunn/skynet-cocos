var network = require('network');
var userHandler = require('userHandler');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        userHandler.registMessage();

        network.connect('127.0.0.1:10000', function() {
            userHandler.requestLogin();
        }, function() {

        });
    },

    // update (dt) {},
});
