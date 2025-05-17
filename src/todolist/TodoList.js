// TodoList.js
import React, { useState, useEffect } from "react";
import "./TodoList.css";
function Header() {
  return (
    <header className="todo-header">
      <h1>Task Manager</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="todo-footer">
      <p>&copy; {new Date().getFullYear()} MyTodoApp</p>
    </footer>
  );
}

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!input.trim()) return;
    const newTodo = { id: Date.now(), text: input.trim(), completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-wrapper">
      <Header />
      <div className="todo-container">
        <h2>My Todo List</h2>
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
