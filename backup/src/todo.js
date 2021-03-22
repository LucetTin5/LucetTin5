const toDoList = document.querySelector(".toDoContainer"),
    toDoForm = document.querySelector(".toDoAccetor"),
    toDoInput = toDoForm.querySelector(".toDoInput");

const TODO = 'todo';

let toDos = [];

function handleBtn(event) {
    event.preventDefault();
    const target = event.target.parentNode;
    const cleanToDos = toDos.filter((t) => t.id !== parseInt(target.id));
    toDos = cleanToDos;
    saveToDos();
    toDoList.removeChild(target);
}
function saveToDos() {
    localStorage.setItem(TODO, JSON.stringify(toDos));
}
function paintToDo(work) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const id = toDos.length + 1;
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", handleBtn);
    span.innerText = work;
    delBtn.innerText = 'X';
    li.id = span.id = delBtn.id = id;
    li.append(delBtn, span);
    toDoList.appendChild(li);
    toDoObj = {
        work: work,
        id: id
    }
    toDos.push(toDoObj);
    saveToDos();
}

function loadToDo() {
    const toDoList = JSON.parse(localStorage.getItem(TODO));
    if (toDoList) {
        toDoList.forEach((t) => paintToDo(t.work));
    }
}

function handleToDo(event) {
    event.preventDefault();
    const toDo = toDoInput.value;
    paintToDo(toDo);
}

function init() {
    toDoForm.addEventListener("submit", handleToDo);
    loadToDo();
}

init();