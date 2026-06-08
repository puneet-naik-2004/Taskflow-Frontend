

import React from "react";
import "../Style/TaskForm.css";

const TaskForm = ({
  title,
  setTitle,
  description,
  setDescription,
  handleSubmit,
  editId,
}) => {
  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Task Title"
        value={title || ""}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={description || ""}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <button type="submit">
        {editId
          ? "Update Task"
          : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;