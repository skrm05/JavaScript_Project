const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const togle = document.getElementById("toggle");
const mode = document.getElementById("mode");

togle.addEventListener("click", () => {
  if (togle.checked) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    todosUL.classList.add("dark-bg");
    input.classList.add("dark-bg");
    mode.innerText = "dark mode on";
  } else {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "#444";
    todosUL.classList.remove("dark-bg");
    input.classList.remove("dark-bg");
    mode.innerText = "light mode on";
  }
});

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}

function updateLS() {
  let todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
