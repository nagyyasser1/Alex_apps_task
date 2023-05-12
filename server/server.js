import express from 'express'
import cors from 'cors'
import * as fs from 'fs'

const usersJson = fs.readFileSync('data/users.json', 'utf8')
let users = JSON.parse(usersJson)

const toDosJson = fs.readFileSync('data/todos.json', 'utf8')
let toDos = JSON.parse(toDosJson)

const app = express()

app.use(cors())
app.use(express.json())

app.get('/users', (req, res) => {
  // remove password from users
  const safeUsers = users.map((user) => {
    const { password, ...safeUser } = user
    return safeUser
  })
  res.send(safeUsers)
})

app.get('/todos', auth, (req, res) => {
  const user = res.locals.user
  const data = toDos.filter((toDo) => toDo.user_id === user.id)
  res.send(data)
})

app.post('/todos', auth, (req, res) => {
  const user = res.locals.user
  let newToDo = req.body
  // get the biggest id and add 1 to it
  newToDo.id = Math.max(...toDos.map((toDo) => toDo.id)) + 1
  newToDo.user_id = user.id
  newToDo.completed = false
  toDos.push(newToDo)
  fs.writeFileSync('data/todos.json', JSON.stringify(toDos))
  res.send(newToDo)
})

app.put('/todos/:id', auth, ownToDo, (req, res) => {
  const id = parseInt(req.params.id)
  const toDo = toDos.find((toDo) => toDo.id === id)
  // toggle completed
  toDo.completed = !toDo.completed
  fs.writeFileSync('data/todos.json', JSON.stringify(toDos))
  res.send(toDo)
})

app.delete('/todos/:id', auth, ownToDo, (req, res) => {
  const id = parseInt(req.params.id)
  toDos = toDos.filter((toDo) => toDo.id !== id)
  fs.writeFileSync('data/todos.json', JSON.stringify(toDos))
  res.send({
    message: 'Todo deleted',
  })
})

// basic auth middleware
function auth(req, res, next) {
  const { authorization } = req.headers
  // if there is no authorization header, return 401

  if (!authorization) {
    res.status(401).send({
      message: 'Unauthorized!!',
    })
    return
  }
  const [username, password] = Buffer.from(
    authorization.split(' ')[1],
    'base64',
  )
    .toString()
    .split(':')
  const user = users.find(
    (user) => user.username === username && user.password === password,
  )
  if (!user) {
    res.status(401).send({
      message: 'Invalid username or password',
    })
    return
  }
  res.locals.user = user
  next()
}

// own todo middleware
function ownToDo(req, res, next) {
  const user = res.locals.user
  const id = parseInt(req.params.id)
  const toDo = toDos.find((toDo) => toDo.id === id)
  if (!toDo) {
    res.status(404).send({
      message: 'Todo not found',
    })
    return
  }
  if (toDo.user_id !== user.id) {
    res.status(403).send({
      message: 'Forbidden',
    })
    return
  }
  next()
}

app.listen(4000, () => {
  console.log('Server listening on port http://localhost:4000')
})
