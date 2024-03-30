$(document).ready(function () {
  const taskInput = $("#task-input");
  const addTaskBtn = $("#add-task-btn");
  const todoTaskList = $("#todo-task-list");
  const completedTaskList = $("#completed-task-list");
  const apiUrl = "https://jsonplaceholder.typicode.com/todos"; // Mock API URL

  addTaskBtn.click(function () {
    const taskText = taskInput.val().trim();
    if (taskText !== "") {
      addTask(taskText);
    }
  });

  // Function to add task to the "To Do" section

  function addTask(taskText) {
    const li = $("<li>").addClass("").text(taskText);
    const checkbox = $("<input>")
      .attr("type", "checkbox")
      .addClass("task-checkbox");
    li.prepend(checkbox);

    const deleteBtn = $("<button>")
      .addClass("btn btn-danger btn-sm")
      .html("<i class='fa fa-trash'></i>")
      .click(function () {
        li.remove();
      });

    li.append(deleteBtn);

    todoTaskList.append(li);
    taskInput.val("");
  }

  // Function to move task from "To Do" to "Completed" section
  function markAsCompleted(li) {
    const checkbox = li.find(".task-checkbox");
    const taskText = li.text();
    const newLi = $("<li>").addClass("").text(taskText);
    const undoBtn = $("<button>")
      .addClass("btn btn-warning btn-sm mr-2")
      .text("Undo")
      .click(function () {
        markAsToDo(newLi);
      });
    const deleteBtn = $("<button>")
      .addClass("btn btn-danger btn-sm")
      .html("<i class='fa fa-trash'></i>")

      .click(function () {
        newLi.remove();
      });
    newLi.append(deleteBtn, undoBtn);
    completedTaskList.append(newLi);
    li.remove();
    checkbox.prop("checked", false);
  }

  // Function to move task from "Completed" to "To Do" section
  function markAsToDo(li) {
    const taskText = li.text();
    const newLi = $("<li>").addClass("").text(taskText);
    const checkbox = $("<input>")
      .attr("type", "checkbox")
      .addClass("task-checkbox");
    const deleteBtn = $("<button>")
      .addClass("btn btn-danger btn-sm")
      .html("<i class='fa fa-trash'></i>")
      .click(function () {
        newLi.remove();
      });
    newLi.prepend(checkbox);
    newLi.append(deleteBtn);
    todoTaskList.append(newLi);
    li.remove();
  }

  // Event listener to mark task as done
  $(document).on("change", ".task-checkbox", function () {
    const li = $(this).closest("li");
    if (this.checked) {
      markAsCompleted(li);
    } else {
      markAsToDo(li);
    }
  });

  taskInput.keydown(function (event) {
    if (event.which === 13) {
      event.preventDefault();
      addTask(taskInput.val());
    }
  });

  // Fetch tasks from mock API and add them to "To Do" section
  axios
    .get(apiUrl)
    .then((response) => {
      response.data.slice(0, 4).forEach((task) => {
        addTask(task.title);
      });
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });

  // Display current date and time
  const currentDateTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  $("#current-date-time").text("Current Date & Time: " + currentDateTime);
});
