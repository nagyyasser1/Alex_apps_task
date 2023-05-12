import React, { useRef } from 'react'
import './style.css'

function Add({ addNewTodo }) {
  const todoRef = useRef()
  return (
    <div className="add_container">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addNewTodo(todoRef.current.value)
        }}
      >
        <textarea
          ref={todoRef}
          name="todoText"
          cols="30"
          rows="10"
          placeholder="write your todo here."
        ></textarea>
        <input type="submit" placeholder="add" />
      </form>
    </div>
  )
}

export default Add
