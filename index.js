const express = require('express');
const path = require('path');
var firebase = require("firebase/app");
const f = require('./firebase/config');
const add_stud_route = require('./routes/add_student');
const { isSignedIN ,logout, forgetPassword} = require('./routes/login');
const {signUpWithEmailPassword} = require("./routes/signup");
const { addTodaysAttendence,deleteStudent,editstud } = require('./firestore/db');
const e_app = express()
const port = 5000

e_app.use(express.static(__dirname+"/public"))

var email,password,name,prn,cLass,gender,isUser=false;

e_app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,
    "./public/html/index.html"))
})

e_app.get('/login',(req, res) => {
  res.sendFile(path.join(__dirname,
    "./public/html/login.html"))
})

e_app.post("/getparams",(req,res)=>{
  email=req.headers.email.slice(1,-1);
  password=req.headers.password.slice(1,-1);
  res.send("ok")
})

e_app.post("/getstudent",(req,res)=>{
  name=req.headers.name;
  prn=req.headers.prn;
  cLass=req.headers.class;
  gender=req.headers.gender;
  if(add_stud_route(name,prn,cLass,gender)){
  res.send("ok")
  }
})

e_app.get('/signin', (req, res) => {
  res.send(' SIGN IN!')
  signUpWithEmailPassword()
})

e_app.get('/dashboard',async(req,res,next)=>{
  if (await isSignedIN(email,password)) {
    isUser=true
    next()
  }
  else{
    isUser=false
    res.redirect("/login")
  }
} ,(req, res) => {
  res.sendFile(path.join(__dirname,
    "./public/html/dashboard.html"))
})

e_app.get("/addStudent",(req,res,next)=>{
  if (isUser) {
    next();
  }
  else{
    isUser=false
    res.redirect("/login")
  }
},
(req,res)=>{
  res.sendFile(path.join(__dirname,
    "./public/html/addstudent.html"))
})

e_app.get("/allStudent",(req,res,next)=>{
  if (isUser) {
    next();
  }
  else{
    isUser=false
    res.redirect("/login")
  }
},
(req,res)=>{
  res.sendFile(path.join(__dirname,
    "./public/html/allstudents.html"))
})

e_app.get("/record",(req,res,next)=>{
  if (isUser) {
    next();
  }
  else{
    isUser=false
    res.redirect("/login")
  }
},
(req,res)=>{
  res.sendFile(path.join(__dirname,
    "./public/html/record.html"))
})

e_app.post("/attendenceToDB",(req,res)=>{
  var array = req.headers.array;
  // var arr = JSON.parse(array)
  // console.log(arr);
  if (addTodaysAttendence(array)) {
    res.send("ok");
  }
})

e_app.post("/deletestudent",async(req,res)=>{
  var id = req.headers.id;
  console.log("index",id);
  await deleteStudent(id)
    console.log("ok");
    res.send("ok")
  
})

e_app.get("/editstudent",(req,res)=>{
  res.sendFile(path.join(__dirname,
    "./public/html/editstudent.html"))
})

e_app.post("/editstudentDB",(req,res)=>{
  console.log("edit");
  var name=req.headers.name;
  var prn=req.headers.prn;
  var cLass=req.headers.class;
  var gender=req.headers.gender;
  var id=req.headers.id
  if(editstud(name,prn,cLass,gender,id)){
  res.send("ok")
  }
})

e_app.post("/forget",(req,res)=>{
 var email=req.headers.email.slice(1,-1);
  forgetPassword(email)
  res.send("ok")
})
e_app.get("/logout",(req,res)=>{
   if (logout()) {
     res.redirect("/login")
    console.log(logout());
  }
})

e_app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})