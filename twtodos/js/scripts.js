// Select DOM elements
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearAllBtn");

// Function to validate todo text
/**
 * Validates the text of a todo item based on specific criteria.
 *
 * @param {string} todoText - The text of the todo item to validate.
 * @returns {string|null} Returns a validation error message if the text is invalid,
 *                        or `null` if the text passes all validation checks.
 *
 * Validation criteria:
 * - The text must not be empty.
 * - The text must be at least 3 characters long.
 * - The text must start with a capital letter.
 */
const validateTodoText = (todoText) => {
  if (!todoText) return "Please enter a todo item.";
  if (todoText.length < 3)
    return "Todo item must be at least 3 characters long.";
  if (!/^[A-Z]/.test(todoText))
    return "Todo item must start with a capital letter.";
  return null; // No validation errors
};

// Function to create a new list item
const createTodoItem = (todoText) => {
  const listItem = document.createElement("li");
  listItem.className =
    "list-group-item d-flex justify-content-between align-items-center";
  listItem.draggable = true;

  // Add drag event listeners
  listItem.addEventListener("dragstart", handleDragStart);
  listItem.addEventListener("dragover", handleDragOver);
  listItem.addEventListener("drop", handleDrop);
  listItem.addEventListener("dragend", handleDragEnd);

  // Add the todo text
  const todoTextSpan = document.createElement("span");
  todoTextSpan.textContent = todoText;
  listItem.appendChild(todoTextSpan);

  // Create a button container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex gap-2";

  // Create an edit button
  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning btn-sm";
  editBtn.textContent = "Edit";

  // Add event listener to edit the todo
  editBtn.addEventListener("click", () => {
    const newTodoText = prompt("Edit your todo:", todoTextSpan.textContent);
    if (newTodoText && newTodoText.trim()) {
      const validationError = validateTodoText(newTodoText.trim());
      if (validationError) {
        alert(validationError);
        return;
      }
      todoTextSpan.textContent = newTodoText.trim();
    }
  });

  // Create a remove button
  const removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-danger btn-sm";
  removeBtn.textContent = "Remove";

  // Add event listener to remove the todo
  removeBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to remove this todo?")) {
      todoList.removeChild(listItem);
    }
  });

  // Append buttons to the button container
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(removeBtn);

  // Append the button container to the list item
  listItem.appendChild(buttonContainer);

  return listItem;
};

// Function to add a new todo
/**
 * Adds a new todo item to the todo list.
 *
 * This function retrieves the text from the input field, validates it, and if valid,
 * creates a new todo item and appends it to the todo list. If the input is invalid,
 * an alert is displayed with the validation error message.
 *
 * @function
 * @returns {void}
 */
const addTodo = () => {
  const todoText = todoInput.value.trim();
  const validationError = validateTodoText(todoText);

  if (validationError) {
    alert(validationError);
    return;
  }

  const listItem = createTodoItem(todoText);
  todoList.appendChild(listItem);

  // Clear the input field
  todoInput.value = "";
};

// Drag and Drop Handlers
let draggedItem = null;

/**
 * Handles the drag start event for a draggable item.
 * Sets the `draggedItem` to the current element and hides it after a short delay.
 *
 * @this {HTMLElement} The element being dragged.
 */
const handleDragStart = function () {
  draggedItem = this;
  setTimeout(() => (this.style.display = "none"), 0);
};

const handleDragOver = (event) => event.preventDefault();

/**
 * Handles the drop event for a draggable item in a to-do list.
 * Prevents the default drop behavior and reorders the items in the list
 * based on the dragged item's position relative to the target item.
 *
 * @param {DragEvent} event - The drag event triggered when an item is dropped.
 */
const handleDrop = function (event) {
  event.preventDefault();
  if (this !== draggedItem) {
    const items = Array.from(todoList.children);
    const draggedIndex = items.indexOf(draggedItem);
    const targetIndex = items.indexOf(this);

    if (draggedIndex < targetIndex) {
      todoList.insertBefore(draggedItem, this.nextSibling);
    } else {
      todoList.insertBefore(draggedItem, this);
    }
  }
};

/**
 * Handles the drag end event for a draggable item.
 * Restores the display style of the dragged item and resets the draggedItem variable.
 *
 * @this {HTMLElement} The element that triggered the drag end event.
 */
const handleDragEnd = function () {
  this.style.display = "flex";
  draggedItem = null;
};

// Function to clear all todos
/**
 * Clears all todos from the todo list after user confirmation.
 * Prompts the user with a confirmation dialog, and if confirmed,
 * removes all child elements from the `todoList` element.
 */
const clearAllTodos = () => {
  if (confirm("Are you sure you want to clear all todos?")) {
    todoList.innerHTML = ""; // Remove all child elements from the todo list
  }
};

// Add event listeners
addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addTodo();
});
clearAllBtn.addEventListener("click", clearAllTodos);
