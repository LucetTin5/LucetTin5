const clockDiv = document.querySelector(".clockContainer"),
    clockTitle = document.querySelector(".clockTitle");


function clock() {
    const date = new Date();
    const Time = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
    clockTitle.innerText = `${Time.hour < 10 ? `0${Time.hour}` : Time.hour} : ${Time.minute < 10 ? `0${Time.minute}` : Time.minute} : ${Time.second < 10 ? `0${Time.second}` : Time.second}`
}

function init() {
    clock();
    setInterval(clock, 1000);
}

init();