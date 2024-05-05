var todoList = JSON.parse(localStorage.getItem('todoList')) || [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Load todoList from local storage
update();

// Event listeners for add and delete
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Event listeners for filters
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e);
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }
});

// Event listener for enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Updates the all the remaining, completed, and main list
function update() {
    comdoList = todoList.filter((ele) => ele.complete);
    remList = todoList.filter((ele) => !ele.complete);
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}

// Adds the task in main list
function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("OOPS...Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });
    todoInput.value = "";
    update();
    addinmain(todoList);
    // Save todoList to local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Renders the main list and views on the main content
function addinmain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
                    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
                    <div class="todo-actions">
                        <button class="complete btn btn-success">
                            <i class=" ci bx bx-check bx-sm"></i>
                        </button>
                        <button class="delete btn btn-error" >
                            <i class="di bx bx-trash bx-sm"></i>
                        </button>
                    </div>
                </li>`;
        allTodos.innerHTML += x;
    });
}

// Deletes an individual task and updates all the list
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => ele.id != deleted);
    update();
    addinmain(todoList);
    // Save todoList to local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Completes an individual task and updates all the list
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            obj.complete = !obj.complete;
            e.target.parentElement.parentElement.querySelector("#task").classList.toggle("line");
        }
    });
    update();
    addinmain(todoList);
    // Save todoList to local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Deletes all the tasks
function deleteAll(todo) {
    todoList = [];
    update();
    addinmain(todoList);
    // Save todoList to local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Deletes only completed tasks
function deleteS(todo) {
    todoList = todoList.filter((ele) => !ele.complete);
    update();
    addinmain(todoList);
    // Save todoList to local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Functions for filters
function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {
    addinmain(remList);
}

function viewAll() {
    addinmain(todoList);
}
