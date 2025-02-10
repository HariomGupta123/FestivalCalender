import { useState, useEffect } from "react";
import useFestivalStore from "../store/usefestivalStore";
import Button from "../Component/Button";
import Input from "../Component/Input";

const checkNotification = (dateTime, id, completed) => {
  const currentTime = new Date();
  if (new Date(dateTime) <= currentTime && !completed) {
    alert(`Time to complete your task! Todo ID: ${id}`);
  }
};

const TaskManager = () => {
  const [todoText, setTodoText] = useState("");
  const [dateTime, setDateTime] = useState("");
  const { todos, addTodo, removeTodo, toggleCompleted } = useFestivalStore();

  console.log("Todos: ", todos); // Debugging todos state

  const handleAddTodo = () => {
    if (todoText && dateTime) {
      const newTodo = {
        id: Date.now(),
        text: todoText,
        dateTime,
        completed: false,
      };
      addTodo(newTodo);
      setTodoText("");
      setDateTime("");
      console.log("New Todo Added: ", newTodo); // Debugging added todo
    }
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id);
    console.log("Todo Removed: ", id); // Debugging removed todo
  };

  const handleToggleCompleted = (id) => {
    toggleCompleted(id);
    console.log("Todo Toggled Completed: ", id); // Debugging toggled completed
  };

  useEffect(() => {
    const interval = setInterval(() => {
      todos.forEach((todo) =>
        checkNotification(todo.dateTime, todo.id, todo.completed)
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [todos]);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md sm:w-4-5 lg:w-1/3">
      <h1 className="text-sm font-bold text-center mb-4">Task Manager</h1>

      <div className="mb-4">
        <Input
          type="text"
          placeholder="Task text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-full p-1 border border-gray-300 rounded-lg mb-2"
        />
        <Input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-1 border border-gray-300 rounded-lg"
        />
      </div>

      <Button
        onClick={handleAddTodo}
        className="w-full p-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Add Task
      </Button>

      <ul className="mt-6 space-y-4">
        {todos.length === 0 ? (
          <li className="text-center text-gray-500">No tasks available</li>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-3 rounded-lg ${
                todo.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <span
                className={`text-lg ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <span className="text-sm text-gray-600">
                {new Date(todo.dateTime).toLocaleString()}
              </span>
              <div className="flex items-center">
                <Button
                  onClick={() => handleToggleCompleted(todo.id)}
                  className="ml-2 px-4 bg-blue-500 text-sm text-white rounded-lg hover:bg-blue-600"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </Button>
                <Button
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="ml-2 px-4 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskManager;
