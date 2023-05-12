import React, { useState } from 'react'
import './style.css'

function Login({ users, handleLogin, loginError }) {
  const [formData, setFormData] = useState({ username: '', password: '' })

  return (
    <div className="login_container">
      <div className="login_header">
        <h1>Login</h1>
      </div>
      <div className="login_dropdown">
        <select
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }}
        >
          {users?.length > 0 &&
            users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      <div className="login_form">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin(formData)
          }}
        >
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }}
          />
          <div className="submitBTN">
            <input type="submit" placeholder="login" />
          </div>
          <p>{loginError}</p>
        </form>
      </div>
    </div>
  )
}

export default Login
