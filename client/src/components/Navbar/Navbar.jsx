import React from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
function Navbar({ userData, setUserData }) {
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('currentUser')
    setUserData({})
    navigate('/')
  }
  return (
    <div className="navbar_container">
      {Object.keys(userData).length === 0 ? (
        <h1 className="nav_header">TODO APP</h1>
      ) : (
        <div className="navbar">
          <div className="user_Info">
            <h3>{userData.name}</h3>
            <img src={userData.avatar} alt="userImage" />
          </div>
          <div className="actions">
            <div>
              <Link to={'/add'}>add another one?</Link>
            </div>
            <div>
              <Link to={'/todos'}>myTodos</Link>
            </div>
            <button onClick={handleLogOut}>logou</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
