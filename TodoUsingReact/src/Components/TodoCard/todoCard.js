import React from "react";
import { Card, Button } from "react-bootstrap";
import "./todoCard.css";

const TodoCard = ({ todo, onEdit, onDelete, onUpdate }) => {
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ ...todo, [name]: value });
  };

  const priorityColor = {
    Normal: 'text-info',
    Urgent: 'text-warning',
    Critical: 'text-danger',
  };

  return (
    <Card className="todo-card glass-effect">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
            <Card.Title>{todo.title}</Card.Title>
            <span className={`fw-bold ${priorityColor[todo.priority]}`}>{todo.priority}</span>
        </div>
        
        <Card.Text>{todo.description}</Card.Text>

        <div className="status-priority-container">
          <div>
            <label htmlFor={`status-${todo._id}`}>Status</label>
            <select
              id={`status-${todo._id}`}
              name="status"
              value={todo.status}
              onChange={handleFieldChange}
            >
              <option value="New">New</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="OnHold">On Hold</option>
            </select>
          </div>
          <div>
             <label htmlFor={`priority-${todo._id}`}>Priority</label>
             <select
               id={`priority-${todo._id}`}
               name="priority"
               value={todo.priority}
               onChange={handleFieldChange}
             >
               <option value="Normal">Normal</option>
               <option value="Urgent">Urgent</option>
               <option value="Critical">Critical</option>
             </select>
           </div>
        </div>

        <div className="d-flex gap-2">
            <Button onClick={() => onEdit(todo)} variant="primary">Edit</Button>
            <Button onClick={() => onDelete(todo._id)} variant="outline-danger">Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoCard;