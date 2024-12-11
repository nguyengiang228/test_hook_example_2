import React, { useState, useEffect } from "react";
import { Todo } from "../interface/Todolist";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), name: newTodo.trim() }]);
      setNewTodo("");
    }
  };

  const handleEditByIds = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, name: editingText.trim() } : todo
      )
    );
    setEditingTodo(null);
    setEditingText("");
  };

  const handleDeleteByIds = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleCancel = () => {
    setEditingTodo(null);
    setEditingText("");
  };

  useEffect(() => {
    if (!newTodo.trim()) {
      setErrorMessage("Name is require*");
    } else {
      setErrorMessage("");
    }
  }, [newTodo]);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          style={{ height: "2rem", width: "30rem" }}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        {errorMessage.length > 0 && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
      </div>
      <button style={{ marginTop: "1rem" }} onClick={addTodo}>
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "20rem",
                  marginBottom: "1rem",
                }}
              >
                <input
                  style={{ width: "80%" }}
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div
                  style={{ display: "flex", marginLeft: "2rem", width: "20%" }}
                >
                  <button
                    style={{ marginRight: "1rem" }}
                    onClick={() => handleEditByIds(todo.id)}
                  >
                    Save
                  </button>
                  <button onClick={() => handleCancel()}>Cancel</button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "20rem",
                  marginTop: "1rem",
                }}
              >
                <span style={{ width: "80%" }}>{todo.name}</span>
                <div
                  style={{ display: "flex", marginLeft: "2rem", width: "20%" }}
                >
                  <button
                    style={{ marginRight: "1rem" }}
                    onClick={() => {
                      setEditingTodo(todo.id);
                      setEditingText(todo.name);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteByIds(todo.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
