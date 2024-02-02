import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../pages/SingleTodo.module.css";

function SingleTodo({ onDelete }) {
  const [todo, setTodo] = useState({});
  const [editedTitle, setEditedTitle] = useState("");
  const { id } = useParams();

  async function fetchTodo() {
    try {
      const endpoint = `http://localhost:8000/api/v1/todos/${id}`;
      const response = await axios.get(endpoint);
      setTodo(response.data);
      setEditedTitle(response.data.title); // Initialize edited title with the current todo title
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  }

  async function deleteTodo() {
    try {
      const endpoint = `http://localhost:8000/api/v1/todos/${id}`;
      await axios.delete(endpoint);
      onDelete(); // Call onDelete function passed from Home to update todos after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function updateTodo() {
    try {
      const endpoint = `http://localhost:8000/api/v1/todos/${id}`;
      const response = await axios.patch(endpoint, { title: editedTitle });
      setTodo(response.data);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <div className={styles.home}>
      <form className={styles.forms}>
        <input
          type="text"
          value={editedTitle}
          className={styles.todoInput}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <div className={styles.buttons}>
          <button onClick={deleteTodo} className={styles.todoButton}>
            Delete
          </button>
          <button onClick={updateTodo} className={styles.todoButton}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default SingleTodo;
