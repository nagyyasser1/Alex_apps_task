import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Navbar, Todos, Login, Add } from './components'
const url = 'http://localhost:4000'

function App() {
  const [users, setUsers] = useState([])
  const [userTodos, setUserTodos] = useState([])
  const [userData, setUserData] = useState({})
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${url}/users`)
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUserTodo = async (id) => {
    try {
      await axios.delete(`${url}/todos/${id}`, {
        auth: {
          username: userData.username,
          password: userData.password,
        },
      })
      const newUserTodos = userTodos.filter((todo) => todo.id !== id)
      setUserTodos(newUserTodos)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (formData) => {
    try {
      const { data } = await axios.get(`${url}/todos`, {
        auth: formData,
      })

      setUserTodos(data)

      const currentUser = users.find(
        (user) => user.username === formData.username,
      )
      const userInfo = {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        password: formData.password,
        username: formData.username,
      }
      setUserData(userInfo)
      localStorage.setItem('currentUser', JSON.stringify(userInfo))
      setLoginError('')
      navigate('/todos')
    } catch (error) {
      setLoginError(error.response?.data.message)
    }
  }

  const addNewTodo = async (task) => {
    try {
      const { data } = await axios.post(
        `${url}/todos`,
        { task },
        {
          auth: {
            username: userData.username,
            password: userData.password,
          },
        },
      )
      userTodos.push(data)
      navigate('/todos')
    } catch (error) {
      console.log(error)
    }
  }

  const toogleComplete = async (id) => {
    try {
      const { data } = await axios.put(
        `${url}/todos/${id}`,
        {},
        {
          auth: {
            username: userData.username,
            password: userData.password,
          },
        },
      )
      const newTodos = userTodos.map((obj) => {
        if (obj.id === id) {
          return { ...obj, completed: data.completed }
        }

        return obj
      })
      setUserTodos(newTodos)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
      handleLogin({ username: user?.username, password: user?.password })
      setUserData(user)
    }
    getAllUsers()
  }, [])

  return (
    <>
      <Navbar userData={userData} setUserData={setUserData} />
      <Routes>
        <Route
          path="/"
          element={
            <Login
              users={users}
              handleLogin={handleLogin}
              loginError={loginError}
            />
          }
        />
        <Route
          path="/todos"
          element={
            <Todos
              userData={userData}
              todos={userTodos}
              deleteUserTodo={deleteUserTodo}
              toogleComplete={toogleComplete}
            />
          }
        />
        <Route path="/add" element={<Add addNewTodo={addNewTodo} />} />
      </Routes>
    </>
  )
}

export default App
