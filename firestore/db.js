const {getFirestore,collection,addDoc,doc,setDoc,deleteDoc} 
    = require('firebase/firestore');
const db = getFirestore();


const addStudent = async(name,rollNO,cLass,gender) =>{
    var success= false
    try {
    const docRef = await addDoc(collection(db, "students"), {
        name: name,
        rollNO: rollNO,
        cLass: cLass,
        gender:gender
      });
      success=true
      console.log("Document of students written with ID: ", docRef.id);
    
} catch (error) {
    success=false
    console.log("err",error);
}
return success;
}

const addTodaysAttendence = async(array)=>{
    try {
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        var today = dd + '' + mm + '' + yyyy;
        var todaySdate = today.toString();
        console.log(typeof(todaySdate));
        await setDoc(doc(db, "AttendenceDB", todaySdate), {
            array:array
          });
    } catch (error) {
        console.log("err",error);
    }
    }

     const deleteStudent =async(id)=>{
        await deleteDoc(doc(db, "students", id))
      }

    const editstud = async(name,rollNO,cLass,gender,id)=>{
        console.log("ok",id);
        await setDoc(doc(db, "students", id), {
        name: name,
        rollNO: rollNO,
        cLass: cLass,
        gender:gender
          });
    }

    

module.exports={addStudent,addTodaysAttendence,deleteStudent,editstud}
