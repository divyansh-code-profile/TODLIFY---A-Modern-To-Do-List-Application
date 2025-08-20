import React from "react";
import TodoCard from "../TodoCard/todoCard";
import "./todoList.css";

const TodoList = ({ todos, onEdit, onDelete, onUpdate }) => {
  const getCategorizedTodos = () => {
    const today = new Date().toDateString();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toDateString();

    const categorized = {
      today: [],
      tomorrow: [],
      upcoming: [],
    };

    todos.forEach((todo) => {
      if (todo.status === 'Completed') return; // Optionally hide completed tasks
      
      const dueDate = new Date(todo.end_date).toDateString();
      if (dueDate === today) {
        categorized.today.push(todo);
      } else if (dueDate === tomorrowString) {
        categorized.tomorrow.push(todo);
      } else {
        categorized.upcoming.push(todo);
      }
    });

    return categorized;
  };

  const { today, tomorrow, upcoming } = getCategorizedTodos();

  const renderTodoList = (taskList) => {
    if (taskList.length === 0) {
      return <p className="text-secondary">No tasks in this category.</p>;
    }
    return taskList.map((todo) => (
      <TodoCard
        key={todo._id}
        todo={todo}
        onEdit={onEdit}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ));
  };

  return (
    <div className="todo-list-container">
      <div className="todo-category">
        <h2>Today</h2>
        {renderTodoList(today)}
      </div>

      <div className="todo-category">
        <h2>Tomorrow</h2>
        {renderTodoList(tomorrow)}
      </div>

      <div className="todo-category">
        <h2>Upcoming</h2>
        {renderTodoList(upcoming)}
      </div>
    </div>
  );
};

export default TodoList;