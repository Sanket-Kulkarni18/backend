const express = require('express');
var firebase = require("firebase/app");
const f = require('./firebase/config');
const { login } = require('./routes/login');
const {signUpWithEmailPassword} = require("./routes/signup")

const app = firebase.initializeApp(f.firebaseConfig);

const e_app = express()
const port = 3000

e_app.get('/', (req, res) => {
  res.send('Hello World!')
})

e_app.use('/login',login() ,(req, res) => {
  res.send('LOGIN!')
  
})

e_app.get('/signin', (req, res) => {
  res.send(' SIGN IN!')
  signUpWithEmailPassword()
})

e_app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})