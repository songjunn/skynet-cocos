
function registEvent(event, self, func) {
    cc.game.on(event, func, self);
}

function unregistEvent(event, self, func) {
    cc.game.off(event, func, self);
}

function sendEvent(event, args) {
    if (args instanceof Object) {
        debuglog("sendEvent " + event + ":" + JSON.stringify(args));
    } else if (args != null) {
        debuglog("sendEvent " + event + ":" + args);
    } else {
    	debuglog("sendEvent " + event);
    }
    cc.game.emit(event, args);
}
