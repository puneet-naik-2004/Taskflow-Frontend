import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/authServices'
import "../Style/Login.css"

const Login = () => {

  const navigate=useNavigate()
  const [formData, setFormData]=useState({
    email:"",
    password:""
  })
  
const handleChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit=async(e)=>{
   e.preventDefault();

   try{
      const data = await loginUser (formData)
      localStorage.setItem("token", data.token);
      alert("login successfully")
      navigate("/dashboard")

   }catch(error){
    alert(error.response?.data?.message || ("login failed"))

   }

}

return (
  <div className="login-container">
    <div className="login-card">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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
          className="login-btn"
        >
          Login
        </button>
      </form>

      <div className="register-link">
        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default Login
