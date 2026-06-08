import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Dashboard.css"


import {
  getTasks,
  createTasks,
  updateTasks,
  deleteTasks,
  toggleTaskStatus,
} from "../services/taskSevices";

// import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch]  =useState("");
  const [showForm , setShowForm]=useState(false)
  const [filter, setFilter]=useState();

  const completed = tasks.filter(
    (task)=>task.status === "completed"
  ).length

  const pending=tasks.filter (
    (task)=> task.status === "pending"
  ).length

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };


  const filteredTasks = tasks
  .filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((task) => {
    if (filter === "pending") {
      return task.status === "pending";
    }

    if (filter === "completed") {
      return task.status === "completed";
    }

    return true;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await createTasks({
        title,
        description,
      });

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log("Frontend error", error.response?.data);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      await updateTasks(editId, {
        title,
        description,
      });

      setEditId(null);
      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    await deleteTasks(id);
    fetchTasks();
  };

  const handleStatus = async (id) => {
    await toggleTaskStatus(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title || "");
    setDescription(task.description || "");
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

<div className="dashboard">

  <div className="sidebar">
    <div>
      <h2 className="logo">TaskFlow</h2>

      <div className="user-info">
        <h4>{user?.name}</h4>
        <p>{user?.email}</p>
      </div>
    </div>

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>

  <div className="main-content">

    <div className="header">
      <h1>My Tasks</h1>
    </div>

    <div className="stats">
      <div className="card">
        <h4>📋Total Tasks</h4>
        <p className="total">{tasks.length}</p>
      </div>

      <div className="card">
        <h4>✅Completed</h4>
        <p className="completed">{completed}</p>
      </div>

      <div className="card">
        <h4>⏳Pending</h4>
        <p className="pending">{pending}</p>
      </div>
    </div>

    {/* <input
      className="search-box"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="filter-buttons">
  <button onClick={() => setFilter("all")}>All Tasks</button>
  <button onClick={() => setFilter("pending")}>Pending</button>
  <button onClick={() => setFilter("completed")}>Completed</button>
  </div> */}



  <div className="top-filters">
  <input
    type="text"
    placeholder="🔍Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-box"
  />

  <select
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="filter-select"
  >
    <option value="all">📋All Status</option>
    <option value="pending">⏳Pending</option>
    <option value="completed">✅Completed</option>
  </select>
</div>

    <button
  className="add-task-btn"
  onClick={() => setShowForm(!showForm)}
>
  {showForm ? "Close Form" : "+ Add Task"}
</button>

    {/* <TaskForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      handleSubmit={
        editId
          ? handleUpdateTask
          : handleCreateTask
      }
      editId={editId}
    /> */}

     {showForm && (
  <TaskForm
    title={title}
    setTitle={setTitle}
    description={description}
    setDescription={setDescription}
    handleSubmit={
      editId ? handleUpdateTask : handleCreateTask
    }
    editId={editId}
  />
  )}
    <TaskList
      tasks={filteredTasks}
      handleDelete={handleDelete}
      handleStatus={handleStatus}
      handleEdit={handleEdit}
    />

  </div>
</div>
    // </div>
  );
};

export default Dashboard;