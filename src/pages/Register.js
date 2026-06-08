import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/authServices'
import "../Style/Register.css"

const Register = () => {
 const navigate =useNavigate();


 const [formData , setFormData]=useState({
    name:"",
    email:"",
    password:"",
 });


 const handleChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
 }

 const handleSubmit=async(e)=>{
  e.preventDefault();
 

 
 try{
  await registerUser(formData)

  alert("registarion suvcessfull")
  navigate("/dashboard")
 }catch(error){
    alert(error.response?.data?.message ||
      "registarion failed"
    );
 }
};

  return (
  <div className="register-container">
    <div className="register-card">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="register-btn"
        >
          Register
        </button>
      </form>

      <div className="login-link">
        <p>
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Register
