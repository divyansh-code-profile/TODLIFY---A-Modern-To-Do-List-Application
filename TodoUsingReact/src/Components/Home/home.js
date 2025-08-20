import { useEffect, useState, useCallback } from "react";
import "./home.css";
import TaskForm from "../TodoForm/TaskForm";
import TodoList from "../TodoList/todoList";

const API_URL = "http://localhost:3001/to-do-app";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // State to hold the todo being edited
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch tasks.");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleFormSubmit = async (taskData) => {
    const isEditing = !!editingTodo;
    const url = isEditing ? `${API_URL}/${editingTodo._id}` : `${API_URL}/new`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} task.`);
      
      const savedTask = await response.json();
      
      if (isEditing) {
        setTodos(todos.map((t) => (t._id === savedTask._id ? savedTask : t)));
      } else {
        setTodos([savedTask.task, ...todos]);
      }
      setEditingTodo(null); // Exit editing mode
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleDelete = async (todoId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await fetch(`${API_URL}/delete/${todoId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTodos(todos.filter((t) => t._id !== todoId));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task.");
    }
  };
  
  const handleEditClick = (todo) => {
    setEditingTodo(todo);
  };
  
  const handleCancelEdit = () => {
    setEditingTodo(null);
  }

  return (
    <div className="home-container">
      <div className="form-container glass-effect">
        <TaskForm 
          onSubmit={handleFormSubmit}
          initialData={editingTodo}
          onCancelEdit={handleCancelEdit}
        />
      </div>
      <div className="list-container">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : todos.length > 0 ? (
          <TodoList
            todos={todos}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            onUpdate={handleFormSubmit} // For inline status/priority updates
          />
        ) : (
          <p className="text-center">No tasks yet. Add one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Home;