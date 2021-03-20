"use strict";

const getSavedTodos = () => {
  let todosJSON = localStorage.getItem("todos");
  return todosJSON !== null ? JSON.parse(todosJSON) : [];
};

const renderTodos = (todos, filters) => {
  let filteredTodos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  filteredTodos = filteredTodos.filter((todo) => {
    if (filters.hideCompleted) {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const incompleteTodos = filteredTodos.filter(function (todo) {
    return !todo.completed;
  });

  document.querySelector("#todos").innerHTML = "";

  const summary = generateSummaryDOM(incompleteTodos);
  document.querySelector("#todos").appendChild(summary);

  filteredTodos.forEach(function (todo) {
    const p = generateTodoDOM(todo);
    document.querySelector("#todos").appendChild(p);
  });
};

const removeTodo = (id) => {
  console.log(todos);
  todos = todos.filter((el) => el.id !== id);
  console.log(todos);
};

const toggoleTodo = (id) => {
  const idx = todos.findIndex((el) => el.id === id);
  console.log(idx);
  todos[idx].completed = !todos[idx].completed;
};

const generateTodoDOM = (todo) => {
  const div = document.createElement("div");
  const checkbox = document.createElement("input");
  const removeBtn = document.createElement("button");

  removeBtn.addEventListener("click", () => {
    removeTodo(todo.id);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos, filters);
  });
  checkbox.checked = todo.completed;
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    toggoleTodo(todo.id);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos, filters);
  });
  div.appendChild(checkbox);

  const p = document.createElement("span");
  p.textContent = todo.text;
  div.appendChild(p);

  removeBtn.textContent = "x";
  div.appendChild(removeBtn);
  return div;
};

const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
