const express = require('express')
const bcrypt = require('bcryptjs');
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'johhhnn@gamail.com',
      password: 'not smart',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Dan',
      email: 'Danie@gamail.com',
      password: 'not fine',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  //with bcrypt
  // bcrypt.compare("not fine", '$2a$10$APXe/dw94ptrBLQBJeTbI.W9KXctElQROHdNga3ginstCKwsDjyGa', function (err, res) {
  //   // res === true
  //   console.log(res, '1')
  // });
  // bcrypt.compare("not_bacon", '$2a$10$APXe/dw94ptrBLQBJeTbI.W9KXctElQROHdNga3ginstCKwsDjyGa', function (err, res) {
  //   // res === false
  //   console.log(res, '2')
  // });
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    res.json('Logged in failed')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body //destructure req.body, to fit in the format of database
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash)
    });
  });
  database.users.push({
    id: '125',
    name,
    email,
    password,
    entries: 0,
    joined: new Date()
  })
  res.send(database.users[database.users.length - 1])
  /*
  { 
    "id": "125",
    "name": "Jennie",
    "email": "Jennie@gamail.com",
    "password": "not fine",
    "entries": 0,
    "joined": "2021-05-28T11:00:38.971Z"
} */
})

app.get('/profile/:id', (req, res) => { //http parameter usually uses with get
  const { id } = req.params //req.params = {id:input}
  let found = false // prepare for if user does not exist
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!false) {
    res.status(404).send('User not found')//404 status 
  }
})

app.put('/image', (req, res) => {
  //It's PUT request because you need to change something
  //But it will get the same response if you use POST
  const { id } = req.body //In req.body, you need to have data for id
  let found = false // prepare for if user does not exist
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user)
    }
  })
  if (!false) {
    res.status(404).send('User not found')//404 status 
  }

})

app.listen(3000, () => {
  console.log('listen successfully')
})

