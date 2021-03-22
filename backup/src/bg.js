const body = document.querySelector("body");
const searchForm = document.querySelector(".bgSelectorForm"),
    search = searchForm.querySelector(".bgSelector")

let KEYWORD = "keyword";

function handleSearch(event) {
    event.preventDefault();
    const keyword = search.value;
    localStorage.setItem(KEYWORD, keyword);
    paintBg(KEYWORD);
}
function paintBg(keyword) {
    const img = new Image();
    img.src = `https://source.unsplash.com/1920x1080/?${keyword}`;
    img.classList.add("bgImg");
    body.appendChild(img);
}
function init() {
    searchForm.addEventListener("submit", handleSearch);
    const bgKey = localStorage.getItem(KEYWORD);
    window.addEventListener("load", paintBg(bgKey));
}

init();