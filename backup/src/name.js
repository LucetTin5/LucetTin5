const nameForm = document.querySelector(".nameContainer"),
    nameInput = document.querySelector(".nameTitle"),
    nameContent = document.querySelector(".nameContent");

const NAME = 'name';

function handleName(event) {
    event.preventDefault();
    const name = nameInput.value;
    localStorage.setItem(NAME, name);
    nameInput.setAttribute("style", "display:none;");
    nameContent.innerText = `Hello, Good to see you. ${name}.`
}
function askName() {
    nameForm.addEventListener("submit", handleName);
}
function loadName() {
    const name = localStorage.getItem(NAME);
    if (name) {
        nameInput.setAttribute("style", "display:none;");
        nameContent.innerText = `Hello again, ${name}.`
    } else {
        askName();
    }
}

function init() {
    loadName();
}

init();