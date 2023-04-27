const taskInput = document.querySelector("#new-task");
const addButton = document.querySelector(".button_add-task");
const incompleteTaskHolder = document.querySelector("#incomplete-tasks");
const completedTasksHolder = document.querySelector("#completed-tasks");

const createNewTaskElement = function(taskString) {

	const listItem = document.createElement("li");
	listItem.classList.add("list-task__item");

	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.classList.add("checkbox");

	const label = document.createElement("label");
	label.classList.add("label");
	label.innerText = taskString;

	const editInput = document.createElement("input");
	editInput.type = "text";
	editInput.classList.add("input");

	const editButton = document.createElement("button");
	editButton.innerText = "Edit";
	editButton.classList.add("button", "button_edit-task");

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("button", "button_delete-task");

	const deleteButtonImg = document.createElement("img");
	deleteButtonImg.src = "./remove.svg";
	deleteButtonImg.classList.add("button__img");
	deleteButtonImg.alt = "remove"
	deleteButton.appendChild(deleteButtonImg)

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

  return listItem;
}

const addTask = function() {

	if (!taskInput.value) {
		return;
	}

	const listItem = createNewTaskElement(taskInput.value);
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = "";
}

const editTask = function() {
	const listItem = this.parentNode;
	console.log("this", this);
	const editInput = listItem.querySelector(".input");
	const label = listItem.querySelector(".label");
	const editBtn = listItem.querySelector(".button_edit-task");
	const containsClass = listItem.classList.contains("list-task__item_edit");

	if (containsClass) {
		label.innerText = editInput.value;
		editBtn.innerText = "Edit";
	} else {
		editInput.value = label.innerText;
		editBtn.innerText = "Save";
	}

	listItem.classList.toggle("list-task__item_edit");
}

const deleteTask = function() {
	const listItem = this.parentNode;
	const listTask = listItem.parentNode;
  listTask.removeChild(listItem);
}

const taskCompleted = function() {
	const listItem = this.parentNode;
	listItem.classList.add("list-task__item_completed");
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
	const listItem = this.parentNode;
	listItem.classList.remove("list-task__item_completed");
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
	const checkBox = taskListItem.querySelector(".checkbox");
	const editButton = taskListItem.querySelector(".button_edit-task");
	const deleteButton = taskListItem.querySelector(".button_delete-task");
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
