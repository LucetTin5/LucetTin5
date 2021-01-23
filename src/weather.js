const weatherContainer = document.querySelector(".weatherContainer");
const API_KEY = "679da896709c168af12bdb7ed96ed5b2";
const LOC = "location";

function getWCode(id) {
    let code;
    switch (id) {
        default:
            code = "01d";
            break;
        case(id >= 200 && id <= 232):
            code = "11d";
            break;
        case (id >= 300 && id <= 321):
            code = "09d";
            break;
        case ((id >= 500 && id <= 531) && id !== 511):
            code = "10d";
            break;
        case (id >= 600 && id <= 622):
            code = "13d";
            break;
        case (id >= 700 && id <= 781):
            code = "50d";
            break;
        case (id === 801):
            code = "02d";
            break;
        case (id === 802):
            code = "03d";
            break;
        case (id === 803 || id === 804):
            code = "04d";
            break;
    }
    return code;
}
function paintWeather(data) {
    const temp = data.main.temp;
    const weather = data.weather[0].id;
    const weatherCode = getWCode(weather);
    const location = data.name;
    const weatherIcon = `http://openweathermap.org/img/wn/${weatherCode}@2x.png`
    const currentWeather = document.createElement("span");
    currentWeather.innerHTML = `${location} ${temp}℃`;
    const img = document.createElement("img");
    img.classList.add("weatherIcon");
    img.src = weatherIcon
    weatherContainer.appendChild(img);
    weatherContainer.appendChild(currentWeather);
}
function geoSuc(position) {
    const coords = position.coords;
    const location = {
        latitude: coords.latitude,
        longitude: coords.longitude
    };
    localStorage.setItem(LOC, JSON.stringify(location));
    return location;
}
function geoErr(err) {
    console.log(err, "Can't get current position.");
}
function getLocation() {
    const location = navigator.geolocation.getCurrentPosition(geoSuc, geoErr);
    return location;
}
function loadWeather() {
    const location = JSON.parse(localStorage.getItem(LOC));
    if (location) {
        getWeather(location.latitude, location.longitude);
    } else {
        getLocation().then((loc) => getWeather(loc.latitude, loc.longitude));
    }
}
function getWeather(lat, lon) {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(API_URL).then((response) => { return response.json() }).then((json) => {paintWeather(json)});
}
function init() {
    loadWeather();
}

init();