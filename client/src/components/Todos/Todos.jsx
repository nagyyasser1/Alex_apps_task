import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Todos({ todos, deleteUserTodo, toogleComplete }) {
  return (
    <div className="todos_container">
      {todos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>completed</th>
              <th>Toggle Complete</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((t) => (
              <tr key={t.id}>
                <td>{t.task}</td>
                <td>{t.completed ? 'yes' : 'no'}</td>
                <td>
                  <button onClick={() => toogleComplete(t.id)}>toggle</button>
                </td>
                <td>
                  <button onClick={() => deleteUserTodo(t.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <p>
            no posts
            <Link to="/add">Add new todo?</Link>
          </p>
          <Link to={'/'}>login </Link>
        </>
      )}
    </div>
  )
}

export default Todos
