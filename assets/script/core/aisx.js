var aisx = {
	/*log: function(text) {
		if (window.aishuoxiao) {
			window.aishuoxiao.log_info(text, appname)
		} else {
			console.log(text);
		}
	},*/

	//获取login code
	getLoginCode: function() {
		if (window.aishuoxiao) {
			return window.aishuoxiao.login();
		}
		return '';
	},

	//获取账号数据
	getUserInfo: function() {
		if (window.aishuoxiao) {
			return window.aishuoxiao.getUserInfo();
		}
		return null;
	},

	//播放tts
	playTTS: function(text, uninterrupt) {
		if (window.aishuoxiao) {
			if (uninterrupt) {
				window.aishuoxiao.textToSpeechInnerUninterrupt(text);
			} else {
				window.aishuoxiao.textToSpeechInner(text);
			}
		}
	},

	//设置tts音量
	setTTSVolumn: function(volumn) {
		if (window.aishuoxiao) {
			window.aishuoxiao.textToSpeechInnerVolume(volumn);
		}
	},

	//设置tts语速
	setTTSSpeed: function(speed) {
		if (window.aishuoxiao) {
			window.aishuoxiao.textToSpeechInnerSpeed(speed);
		}
	},

	enterMyRoom: function() {
		if (window.aishuoxiao) {
			window.aishuoxiao.enterMyRoom();
		}
	},
};

module.exports = aisx;
