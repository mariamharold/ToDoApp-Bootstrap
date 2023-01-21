const todoInput = document.querySelector(".form-control");
const todoButton = document.getElementById("button-addon2");
const todoUl = document.querySelector("#todoul");
const alertSec = document.querySelector("#alert-section");
const clearTodos = document.querySelector("#clear");

let todoApp = JSON.parse(localStorage.getItem("todoApp")) || [];

const getTodoAppFromLocalStorage = () => {
  todoApp.forEach((todo) => {
    createTodo(todo);
  });
};

clearTodos.addEventListener("click", () => {
  localStorage.clear();
  todoApp = [];
  todoUl.innerHTML = "";
  clearTodos.style.display = "none";
});

const clearBtnShow = () => {
  if (todoApp.length >= 2) {
    clearTodos.style.display = "inline-block";
  } else {
    clearTodos.style.display = "none";
  }
};

window.addEventListener("load", () => {
  getTodoAppFromLocalStorage();
  clearBtnShow();
});
let count = localStorage.getItem("count") || 0;

todoButton.addEventListener("click", (e) => {
  if (count == 6) {
    count = 0;
  }
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    let myAlert = `<div class="alert alert-danger w-25 d-flex justify-content-between" role="alert"> <i class="fa-sharp fa-solid fa-circle-exclamation"></i>

  <span>Please, enter todo text!</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
    alertSec.innerHTML = myAlert;
    todoInput.focus();
    return;
  }

  let todoColors = ["primary", "success", "danger", "warning", "info", "dark"];

  const newTodo = {
    id: new Date().getTime(),
    completed: false,
    text: todoInput.value,
    color: todoColors[count],
  };
  count++;
  localStorage.setItem("count", count);
  createTodo(newTodo);

  todoApp.push(newTodo);

  localStorage.setItem("todoApp", JSON.stringify(todoApp));
  clearBtnShow();

  e.target.closest("form").reset();
  todoInput.focus();
});

const createTodo = (newTodo) => {
  let { id, completed, text, color } = newTodo;
  completed ? (color = "") : "";
  const li = document.createElement("li");
  li.setAttribute("id", id);
  li.setAttribute(
    "class",
    `list-group-item list-group-item-${color} m-2 d-flex justify-content-between text-wrap`
  );

  completed ? li.classList.add("text-decoration-line-through") : "";

  const checkIcon = document.createElement("i");
  checkIcon.setAttribute("class", "fas fa-check");
  li.append(checkIcon);

  const todoText = document.createElement("p");
  todoText.setAttribute("class","text-break")
  todoText.innerText = text;
  li.appendChild(todoText);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);
  todoUl.prepend(li);
};

todoUl.addEventListener("click", (e) => {
  const idAttribute = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-check")) {
    e.target.parentElement.classList.toggle("text-decoration-line-through");

    todoApp.forEach((todo) => {
      if (todo.id == idAttribute) {
        todo.completed = !todo.completed;
        e.target.parentElement.classList.toggle(
          `list-group-item-${todo.color}`
        );
      }
    });
  } else if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    todoApp = todoApp.filter((todo) => todo.id != idAttribute);
    let myAlert = `<div class="alert alert-primary w-25 d-flex justify-content-between" role="alert">
  <span>Todo successfully deleted!</span><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
    alertSec.innerHTML = myAlert;
    clearBtnShow();
  }
  localStorage.setItem("todoApp", JSON.stringify(todoApp));
});
