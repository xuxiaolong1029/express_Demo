let formatTime = (time, split) => {
    let date = new Date(time - 0);
    let s = split;
    if (!s) {
        s = '-'
    }
    let year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let newTime =
        year +
        s +
        (month < 10 ? "0" + month : month) +
        s +
        (day < 10 ? "0" + day : day) +
        " " +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec);
    return newTime;
}
// 月日时分秒
let formatTime2 = (time, split) => {
    let date = new Date(time - 0);
    let s = split;
    if (!s) {
        s = '-'
    }
    let month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let newTime =
        (month < 10 ? "0" + month : month) +
        s +
        (day < 10 ? "0" + day : day) +
        " " +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec);

    return newTime;
}
// 年月日
let formatTime3 = (time, split) => {
    let date = new Date(time - 0);
    let s = split;
    if (!s) {
        s = '-'
    }
    let year = date.getFullYear(),
        month = date.getMonth() + 1, //月份是从0开始的
        day = date.getDate()
    let newTime =
        year +
        s +
        (month < 10 ? "0" + month : month) +
        s +
        (day < 10 ? "0" + day : day)

    return newTime;
}

let timeDivisionSecond = (time, split) => {
    let date = new Date(time - 0);
    let s = split;
    if (!s) {
        s = '-'
    }
    let hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    let newTime =
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec);

    return newTime;
}

export default {
    formatTime, timeDivisionSecond, formatTime2, formatTime3
}
