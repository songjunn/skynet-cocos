
window.onerror = function (errorMessage, file, line, message, error) {
    let exception = {};
    exception.errorMessage = errorMessage;
    exception.file = file;
    exception.line = line;
    exception.message = message;
    exception.error = error;
    errorlog(JSON.stringify(exception));
};

function formatTime() {
    let date = new Date();
    let year = String(date.getFullYear());
    let month = (date.getMonth()+1>9)?String(date.getMonth()+1):'0'+String(date.getMonth()+1);
    let day = (date.getDate()>9)?String(date.getDate()):'0'+String(date.getDate());
    let hour = (date.getHours()>9)?String(date.getHours()):'0'+String(date.getHours());
    let min = (date.getMinutes()>9)?String(date.getMinutes()):'0'+String(date.getMinutes());
    let sec = (date.getSeconds()>9)?String(date.getSeconds()):'0'+String(date.getSeconds());
    let str = '['+year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec+']';
    return str;
}

function debuglog(text) {
    let str = '[DEBUG]' + formatTime() + text
    if (window.aishuoxiao) {
      window.aishuoxiao.log_info(str, 'project-name');
    } else {
      console.log(str);
    }
}

function errorlog(text) {
    let str = '[ERROR]' + formatTime() + text
    if (window.aishuoxiao) {
      window.aishuoxiao.log_info(str, 'project-name');
    } else {
      console.log(str);
    }
}

function noticelog(text) {
    let str = '[NOTICE]' + formatTime() + text
    if (window.aishuoxiao) {
      window.aishuoxiao.log_info(str, 'project-name');
    } else {
      console.log(str);
    }
}
