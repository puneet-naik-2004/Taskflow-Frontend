import React from 'react'


const Navbar = ({handleLogout}) => {
  return (
    <div>
      <h2>Task Manager</h2>

      <button type="button"
      onClick={handleLogout}> Logout</button>
      <hr/>
    </div>
  )
}

export default Navbar
