[![license](https://img.shields.io/badge/License-MIT-purple.svg?style=?style=flat-square)](LICENSE) [![database](https://img.shields.io/badge/-14.16.0-white.svg?style=?style=flat-square&logo=node.js)](DATABASE) [![database](https://img.shields.io/badge/Build-Success-brightgreen.svg?style=?style=flat-square&logo=appveyor&logo=mysql)](BUILD)

# JavaScript Code Test (Nuxt.js/Next.js)

This is a simple test to evaluate your skills in JavaScript and Nuxt.js/Next.js.

## Instructions

1. Fork this repository
2. Create a new branch with your name
3. Complete the test
4. Push your changes to your forked repository
5. Send us the link to your forked repository

*P.S. dot not forget to commit your changes.*

## Test Duration

- 2 hours and 30 minutes

## Prerequisites

- Node.js (v14 LTS or higher)

## Run the backend server

```bash
cd server
npm install
npm run start
```

**Output**:

```bash
Server listening on port http://localhost:4000
```

## API documentation

[Postman Collection (⬇️Download)](https://api.postman.com/collections/2008200-b6fd706b-c4ec-498a-b044-50e0af95505f?access_key=PMAT-01GMAG1BQ7GD4P89M2Q2KFFT51)

| Method | Auth | Endpoint | Body | Description |
| ------ | ---- | -------- | ---- | ----------- |
| GET | No | /users | | Get all users |
| GET | Yes | /todos | | Get user todos |
| POST | Yes | /todos | task `string` | Create a new todo |
| PUT | Yes | /todos/:id | | Toggle todo completion |
| DELETE | Yes | /todos/:id | | Delete a todo |

**Body type**: `application/json`

*Example body*:

```json
{
  "task": "Buy milk"
}
```

### Authentication

The API sometimes requires authentication. the authentication type is `Basic Auth`

You can find the credentials in the `server/data/users.json` file.

**Example curl**:

```bash
curl --location --request GET 'http://localhost:4000/todos' \
--header 'Authorization: Basic enVja2VyOjEyMzQ1Ng=='
```

**Example axios**:

```js
await axios.post(endpoint, {}, {
  auth: {
    username: 'zucker',
    password: '123456'
  }
});
```

### Available users

| Avatar | Username | Password |
| ------ | -------- | -------- |
| [<img src="https://robohash.org/zucker-ping.png" width="50">]() | zucker | 123456 |
| [<img src="https://robohash.org/felon-must.png" width="50">]() | felon | 123123 |
| [<img src="https://robohash.org/robon-wood.png" width="50">]() | robon | secret |

## Requirements

### User login page

- User should be able to select a user from the list of users.
- User should be able to see user details (name, avatar).
- User required to enter only password to login after selecting his account from the list.

### User dashboard page

- User should be able to see the list of todos for the selected user.
- User should be able to create a new todo.
- User should be able to toggle todo completion.
- User should be able to delete a todo.

### User Account

- User should be able to view his name and avatar in the app header.
- User should be able to logout.

---

*Good luck!👍*
