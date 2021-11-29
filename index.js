const express = require('express');
var firebase = require("firebase/app");
const f = require('./firebase/config');
const add_stud_route = require('./routes/add_student');
const { login } = require('./routes/login');
const {signUpWithEmailPassword} = require("./routes/signup")

  

const e_app = express()
const port = 3000

e_app.get('/', (req, res) => {
  res.send('Hello World!')
})

e_app.get('/login',(req, res) => {
  res.send('LOGIN!')
  login()
})

e_app.get('/signin', (req, res) => {
  res.send(' SIGN IN!')
  signUpWithEmailPassword()
})

e_app.get("/addStudent",(req,res)=>{
  res.send("Student Added");
  add_stud_route();
})

e_app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})