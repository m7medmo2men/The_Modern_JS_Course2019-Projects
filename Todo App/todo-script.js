"use strict";

const input = document.getElementById("search-text");
const form = document.getElementById("new-todo");
const checkbox = document.getElementById("hide-completed");

/*const todos = [
  {
    text: "Order cat food",
    completed: false,
  },
  {
    text: "Clean kitchen",
    completed: true,
  },
  {
    text: "Buy food",
    completed: true,
  },
  {
    text: "Do work",
    completed: false,
  },
  {
    text: "Exercise",
    completed: true,
  },
];*/
let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

renderTodos(todos, filters);
input.addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.text.value,
    completed: false,
  });
  // todos.push({
  //   text: e.target.elements.text.value,
  //   completed: false,
  // });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos(todos, filters);
  e.target[0].value = "";
});

checkbox.addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
