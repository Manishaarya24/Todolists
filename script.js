

document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todoInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(todo => {
            createTodoElement(todo.text, todo.completed);
        });
    }

    function createTodoElement(todoText, completed = false) {
        const li = document.createElement("li");
        li.textContent = todoText;
        if (completed) {
            li.classList.add("completed");
        }
        todoList.appendChild(li);



        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        li.appendChild(deleteBtn);

        // Add event listener for deleting todo
        deleteBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            li.remove();
            updateTodos();
        });
    }

//     // Function to add a new todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            createTodoElement(todoText);
            todoInput.value = "";
            updateTodos();
        }
    }

//     // Function to update todos in local storage
    function updateTodos() {
        const todos = [];
        todoList.querySelectorAll("li").forEach(todo => {
            todos.push({
                text: todo.textContent,
                completed: todo.classList.contains("completed")
            });
        });
        saveTodos(todos);
    }

//     // Event listener for adding a new todo
    addBtn.addEventListener("click", addTodo);

    // Load todos from local storage when the page loads
    loadTodos();
});
