import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../pages/Home.module.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  async function fetchTodos() {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/todos");
      const data = response.data;
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/todos", {
        title: newTodoTitle,
      });
      const newTodo = response.data;
      setTodos([...todos, newTodo]); // Add new todo to the list
      setNewTodoTitle(""); // Clear input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className={styles.home}>
      <form className={styles.form}>
        <input
          type="text"
          value={newTodoTitle}
          className={styles.todoInput}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <button type="submit" onClick={handleAddTodo} className={styles.todoButton}>
          Add
        </button>
      </form>

      {/* List of existing todos */}
      {todos.map((todo) => (
        <div key={todo.id}>
          <Link to={`singletodo/${todo.id}`}>
            <h2>{todo.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
