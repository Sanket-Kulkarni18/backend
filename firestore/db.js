const {getFirestore,collection,addDoc} = require('firebase/firestore');

const db = getFirestore();


const addStudent = async(name,rollNO,cLass) =>{
    try {
    const docRef = await addDoc(collection(db, "students"), {
        name: name,
        rollNO: rollNO,
        cLass: cLass
      });
      console.log("Document of students written with ID: ", docRef.id);
    
} catch (error) {
    console.log("err",error);
}
}

module.exports={addStudent}
