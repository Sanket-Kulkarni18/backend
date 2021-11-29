const { addStudent } = require("../firestore/db")

const add_stud_route = ()=>{
    addStudent("Sanket Kulkarni",1903076,"T.Y.Btech");
}

module.exports=add_stud_route;