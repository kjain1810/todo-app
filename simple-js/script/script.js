
window.onload = function () {
  var already_there = JSON.parse(window.localStorage.getItem("tasks"));
  if (already_there === null) {
    // console.log("set");
    already_there = {};
  }
  for (let x in already_there) {
    newTodo(x);
  }
}

var already_there = JSON.parse(window.localStorage.getItem("tasks"));
if (already_there == null) {
  // console.log("set");
  already_there = {};
}

const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo(new_task) {
  // console.log("newtodo ", new_task);
  var flag = 0;
  for (; new_task === '';) {
    new_task = prompt('Awww shucks, new task: ');
    flag = 1;
  }
  if (flag === 1) {
    already_there[new_task] = [];
    already_there[new_task].push({ new_task });
    window.localStorage.setItem("tasks", JSON.stringify(already_there));
  }
  var new_item = document.createElement('li');
  new_item.setAttribute('class', classNames.TODO_ITEM);
  new_item.setAttribute('id', new_task);
  var new_text = document.createElement('span');
  new_text.setAttribute('class', classNames.TODO_TEXT);
  new_text.textContent = new_task;
  new_item.appendChild(new_text);
  var new_button = document.createElement('input');
  new_button.setAttribute('type', 'checkbox');
  new_button.setAttribute('id', 'isdone');
  new_button.setAttribute('class', classNames.TODO_CHECKBOX);
  new_button.setAttribute('onclick', 'recount()');
  new_item.appendChild(new_button);

  var new_delete = document.createElement('button');
  new_delete.setAttribute('class', classNames.TODO_DELETE);
  new_delete.setAttribute('onclick', "deleting('" + new_task + "')");
  new_delete.textContent = "Delete";
  new_item.appendChild(new_delete);

  list.appendChild(new_item);
  itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) + 1;
  recount();
}

function recount() {
  var x = document.querySelectorAll('input[type="checkbox"]:checked');
  uncheckedCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) - x.length;
}

function deleting(x) {
  delete already_there[x];
  list.removeChild(document.getElementById(x));
  itemCountSpan.innerHTML = parseInt(itemCountSpan.innerHTML) - 1;
  recount();
}
