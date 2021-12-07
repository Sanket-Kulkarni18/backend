const { addStudent } = require("../firestore/db")

const add_stud_route = (name,prn,cLass,gender)=>{
   return addStudent(name,prn,cLass,gender);
}

module.exports=add_stud_route;