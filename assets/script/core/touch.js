
var TouchType = cc.Enum({
    TOUCH_NONE: 0,
    TOUCH_CLICK_SINGLE: 1, //单击
    TOUCH_CLICK_DOUBLE: 2, //双击
    TOUCH_SLIDE_UP: 3, //上划
    TOUCH_SLIDE_DOWN: 4, //下划
    TOUCH_SLIDE_LEFT: 5, //左划
    TOUCH_SLIDE_RIGHT: 6, //右划
    TOUCH_PRESS_HOLD: 7, //长按
});

cc.Class({
    extends: cc.Component,

    properties: {
        touches:  {
            default: {},
            type: Object
        },
        press: false,
        pressHold: false,
        pressHoldTime: 0,
        lastClicktime: 0,
        enableDoubleClick: false, //禁用双击
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    onDestroy () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    start () {
        
    },

    update (dt) {
        if (this.press && !this.pressHold) {
            this.pressHoldTime += dt;
            if (this.pressHoldTime >= 0.5) { //长按0.5秒
                this.pressHold = true;

                let num = this.getTouchings();
                if (num > 0) this.onPressHold(num);
            }
        }
    },

    onTouchStart (event) {
        this.press = true;
        this.pressHoldTime = 0;

        let touchId = event.touch.getID();
        this.touches[touchId] = 0;

        event.stopPropagation();
    },

    onTouchMove (event) {
        event.stopPropagation();
    },

    onTouchEnd (event) {
        let touchId = event.touch.getID();
        let endPos = event.touch.getLocation();
        let startPos = event.touch.getStartLocation();

        var self = this;
        this.press = false;
        this.pressHoldTime = 0;
        this.touches[touchId] = 1;
        event.stopPropagation();

        //获取触摸数量
        let num = this.ifWaitEnd();
        if (num <= 0) return;

        //检查长按
        if (this.pressHold) {
            this.pressHold = false;
            this.touches = {};
            this.onPressHoldEnd(num);
            return;
        }

        //获取触摸类型
        let touchType = this.getTouchType(event);

        //检查双击
        if (this.enableDoubleClick && touchType == TouchType.TOUCH_CLICK_SINGLE) {
            let nowtime = new Date().getTime();
            if (this.lastClicktime == 0) {
                this.lastClicktime = nowtime;
                this.schedule(function() {
                    if (self.lastClicktime == nowtime) {
                        self.lastClicktime = 0;
                        self.onSingleClick(num);
                    }
                }, 0.3, 0);
                touchType = TouchType.TOUCH_NONE;
            }
            else if (this.lastClicktime > 0 && nowtime - this.lastClicktime < 300) {
                this.lastClicktime = 0;
                touchType = TouchType.TOUCH_CLICK_DOUBLE;
            }
            else {
                this.lastClicktime = 0;
                touchType = TouchType.TOUCH_NONE;
            }
        } 
        
        switch (touchType) {
            case TouchType.TOUCH_CLICK_SINGLE: this.onSingleClick(num); break;
            case TouchType.TOUCH_CLICK_DOUBLE: this.onDoubleClick(num); break;
            case TouchType.TOUCH_SLIDE_DOWN: this.onSlideDown(num); break;
            case TouchType.TOUCH_SLIDE_UP: this.onSlideUp(num); break;
            case TouchType.TOUCH_SLIDE_LEFT: this.onSlideLeft(num); break;
            case TouchType.TOUCH_SLIDE_RIGHT: this.onSlideRight(num); break;
            default: break;
        }

        this.touches = {};
    },

    onTouchCancel (event) {
        this.onTouchEnd(event);
    },

    onSingleClick (fingers) {
        debuglog('touch onSingleClick, fingers='+fingers);
    },

    onDoubleClick (fingers) {
        debuglog('touch onDoubleClick, fingers='+fingers);
    },

    onSlideUp (fingers) {
        debuglog('touch onSlideUp, fingers='+fingers);
    },

    onSlideDown (fingers) {
        debuglog('touch onSlideDown, fingers='+fingers);
    },

    onSlideLeft (fingers) {
        debuglog('touch onSlideLeft, fingers='+fingers);
    },

    onSlideRight (fingers) {
        debuglog('touch onSlideRight, fingers='+fingers);
    },

    onPressHold (fingers) {
        debuglog('touch onPressHold, fingers='+fingers);
    },

    onPressHoldEnd (fingers) {
        debuglog('touch onPressHoldEnd, fingers='+fingers);
    },

    ifWaitEnd() {
        let fingers = 0;
        for (var i in this.touches) {
            if (this.touches[i] == 0) {
                return 0;
            }
            fingers += 1;
        }
        return fingers;
    },

    getTouchings() {
        let fingers = 0;
        for (var i in this.touches) {
            if (this.touches[i] == 0) {
                fingers += 1;
            }
        }
        return fingers;
    },

    getTouchType(event) {
        let endPos = event.touch.getLocation();
        let startPos = event.touch.getStartLocation();

        if (Math.abs(startPos.x - endPos.x) <= 80 &&
            Math.abs(startPos.y - endPos.y) <= 80) {
            return TouchType.TOUCH_CLICK_SINGLE;
        }

        let angle = this.getAngle(endPos, startPos);
        if (angle >= -45.0 && angle <= 45.0) {
            return TouchType.TOUCH_SLIDE_LEFT;
        }
        else if (angle > 45.0 && angle < 135.0) {
            return TouchType.TOUCH_SLIDE_DOWN;
        }
        else if ((angle >= 135.0 && angle <= 180.0) ||
            (angle <= -135.0 && angle >= -180.0)) {
            return TouchType.TOUCH_SLIDE_RIGHT;
        }
        else if (angle < -45.0 && angle > -135.0) {
            return TouchType.TOUCH_SLIDE_UP;
        }

        return TouchType.TOUCH_NONE;
    },

    getAngle(startPos, endPos) {
        var angle = Math.atan2((endPos.y - startPos.y), (endPos.x - startPos.x));
        var theta = angle * (180 / Math.PI);
        return theta;
    },

});
