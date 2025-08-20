import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./TaskForm.css";

const initialFormState = {
  title: "",
  description: "",
  status: "New",
  priority: "Normal",
  start_date: "",
  end_date: "",
  email: "",
  category: "",
};

const TaskForm = ({ onSubmit, initialData, onCancelEdit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing) {
      // Format dates for datetime-local input
      const formatDateTime = (dateString) => dateString ? dateString.slice(0, 16) : "";
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "New",
        priority: initialData.priority || "Normal",
        start_date: formatDateTime(initialData.start_date),
        end_date: formatDateTime(initialData.end_date),
        email: initialData.email || "",
        category: initialData.category || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Title and Description are required.");
      return;
    }
    onSubmit(formData);
    if (!isEditing) {
      setFormData(initialFormState); // Reset form only if creating a new task
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="task-form">
      <h3 className="form-title">{isEditing ? "Edit Task" : "Add a New Task"}</h3>
      
      <Form.Group controlId="title" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="description" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
      </Form.Group>
      
      {/* Other fields... */}
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Reminder Email (Optional)</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>
      
      <div className="d-flex gap-3 mb-3">
        <Form.Group controlId="status" className="flex-fill">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="New">New</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="OnHold">On Hold</option>
            </Form.Select>
        </Form.Group>

        <Form.Group controlId="priority" className="flex-fill">
            <Form.Label>Priority</Form.Label>
            <Form.Select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
            </Form.Select>
        </Form.Group>
      </div>

       <Form.Group controlId="end_date" className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control type="datetime-local" name="end_date" value={formData.end_date} onChange={handleChange} />
      </Form.Group>


      <div className="d-grid gap-2">
        <Button variant="primary" type="submit">
          {isEditing ? "Save Changes" : "Add Task"}
        </Button>
        {isEditing && (
          <Button variant="secondary" onClick={onCancelEdit}>
            Cancel Edit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default TaskForm;