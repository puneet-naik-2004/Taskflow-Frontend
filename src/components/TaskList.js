import React from "react";

const TaskList = ({
  tasks,
  handleDelete,
  handleStatus,
  handleEdit,
}) => {
  return (
    <div>
      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>


          {/* <p style={{
            color:
             task.status === "completed"
            ?"green"
            :"orange"
          }}
          >
            Status: {task.status}
            </p> */}


            <p
  className={
    task.status === "completed"
      ? "completed-status"
      : "pending-status"
  }
>
  Status: {task.status}
</p>

          <div className="task-buttons">
          <button
          className="toggle-btn"
            onClick={() => handleStatus(task._id)}
          >
           🔄 Toggle Status
          </button>

          <button
          className="edit-btn"
            onClick={() => handleEdit(task)}
          >
           ✏️ Edit
          </button>

          <button
          className="delete-btn"
            onClick={() => handleDelete(task._id)}
          >
           🗑️ Delete
          </button>
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default TaskList;