
const pass_variable_and_getResult=()=>{
    event.preventDefault();
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var params = {
      email:email,
      password:password
    }
    if (email==""||password=="") {
      alert("Please Enter email");
      return
    }
     fetch("http://localhost:5000/getparams",{
       method:"POST",
       headers:{
         'Content-type':"application/json",
         "email":JSON.stringify(params.email),
         "password":JSON.stringify(params.password)
       }
     }).then(data=>{
       location.href="http://localhost:5000/dashboard"
     })
}

const addstudent = ()=>{
  event.preventDefault();
  var name = document.getElementById("sname");
  var rollNO = document.getElementById("rollno");
  var cLass = document.getElementById("class");
  var male = document.getElementById("male");
  var female = document.getElementById("female");
  var gender="gender";
  if (male.checked==true) {
    gender="male";
  }else if (female.checked==true) {
    gender="female";
  }
  if (name=="" || rollNO=="" || cLass=="" || gender=="gender") {
    alert("Enter data")
    return;
  }

  var params = {
    name:name.value,
    rollNO:rollNO.value,
    cLass:cLass.value,
    gender:gender
  }
   fetch("http://localhost:5000/getstudent",{
     method:"POST",
     headers:{
       'Content-type':"application/json",
       "name":params.name,
       "prn":params.rollNO,
       "cLass":params.cLass,
       "gender":params.gender
     }
   })
   .then(async (data)=>{
    // await fetchstudent();
    name.value="";
    rollNO.value="";
    cLass.value="";
    male.checked=false;
    female.checked=false;
    alert("Student Added");
    // location.href="http://localhost:5000/allstudent"
   })
   .catch((err)=>{alert(err);})
}


var setGlobal={
  
};
const fetchstudent = async()=>{
  const firebaseConfig = {
    apiKey: "AIzaSyBBZ4WeXoCzVO_EvjZNLOHETdpK5lsYF7E",
    authDomain: "oyster-kode-attendence.firebaseapp.com",
    projectId: "oyster-kode-attendence",
    storageBucket: "oyster-kode-attendence.appspot.com",
    messagingSenderId: "772988200926",
    appId: "1:772988200926:web:7db391271b14f730ba9f4f",
    measurementId: "G-2PM01W0D03"
  };
  var app;
  if (!firebase.apps.length) {
   app = await firebase.initializeApp(firebaseConfig);
 }else {
   app= firebase.app();
 }
  var db = app.firestore();
  let arrOfstudents = [];
   await db.collection("students").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
     arrOfstudents.push({id:doc.id,...doc.data()});
    });
  });
  console.log(arrOfstudents);
  sessionStorage.setItem("arrayofstudents",JSON.stringify(arrOfstudents));
   setGlobal.db=db;
   console.log(setGlobal.db);
}

const deleteStudent = async(id)=>{
  await fetch("/deletestudent",{
    method:"POST",
    headers:{
      id:id
    }
  }).then(()=>{
    alert("Student Removed");
    return true;
  }).catch((err)=>{
  alert(err);
  return false;
  })
 }

const callStudentsONLOAD = ()=>{
  event.preventDefault();
  var date = new Date();
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = date.getFullYear();
  var today = dd + '/' + mm + '/' + yyyy;
  document.getElementById("date").innerText = `Date: ${today}`;

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var day = days[ date.getDay() ];

  document.getElementById("day").innerText=`Day:${day}`;
  var arr = sessionStorage.getItem("arrayofstudents")
  var arrayofstudents = JSON.parse(arr)
  arrayofstudents.forEach(({name,rollNO},index)=>{
    arrayofstudents[index].attended = false;
    displaystudentsforAttendence(name,rollNO,index);
  })

}

const displaystudentsforAttendence = (name,rollNO,index)=>{
  var tablebody = document.getElementById("tablebody")

  var tablerow = document.createElement("tr");
  var tabledata = document.createElement("td");
  tabledata.innerText=`${index+1}`;
  var tabledata2 = document.createElement("td");
  tabledata2.innerText=name;
  var tabledata3 = document.createElement("td");

  var div1 = document.createElement("div");
  div1.setAttribute("class","form-check-inline rad-btn");
  var label = document.createElement("label");
  label.setAttribute("class","form-check-label");
  label.innerText="Present "
  var input = document.createElement("input");
  input.setAttribute("class","form-check-input");
  input.setAttribute("id",`${index}true`)
  input.setAttribute("type","radio");
  input.setAttribute("name",`${index}`);
  label.appendChild(input);
  div1.appendChild(label);


  var div2 = document.createElement("div");
  div2.setAttribute("class","form-check-inline rad-btn");
  var label2 = document.createElement("label");
  label2.setAttribute("class","form-check-label");
  label2.innerText="Absent  ";
  var input2 = document.createElement("input");
  input2.setAttribute("class","form-check-input");
  input2.setAttribute("id",`${index}false`);
  input2.setAttribute("type","radio");
  input2.setAttribute("name",`${index}`);
  label2.appendChild(input2);
  
  div2.appendChild(label2);

  tabledata3.appendChild(div1);
  tabledata3.appendChild(div2);

  tablerow.appendChild(tabledata);
  tablerow.appendChild(tabledata2);
  tablerow.appendChild(tabledata3);
  
  tablebody.append(tablerow);
}

const callStudentsForEditing = async()=>{
  event.preventDefault();
  await fetchstudent();
  var arr = sessionStorage.getItem("arrayofstudents");
  var arrayofstudents = JSON.parse(arr)
  arrayofstudents.forEach(({name,rollNO,cLass,id,gender},index)=>{
    displaystudentsForEditing(name,rollNO,cLass,index+1,id,gender);
  })
}

const displaystudentsForEditing = (name,rollNO,cLass,count,id,gender)=>{
  var tablebody = document.getElementById("tableid");
  var tablerow = document.createElement("tr");
  var tabledata1 = document.createElement("td");
  tabledata1.innerText=count;
  var tabledata2 = document.createElement("td");
  tabledata2.innerText=name;
  var tabledata3 = document.createElement("td");
  tabledata3.innerText=rollNO;
  var tabledata4 = document.createElement("td");
  tabledata4.innerText=cLass;
  var tabledata5 = document.createElement("td");
  var btn1 = document.createElement("button");
  btn1.setAttribute("class","btn btn-success");
  btn1.setAttribute("type","button");
  btn1.innerText="Edit"
  btn1.addEventListener("click",()=>{
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("name",name);
    sessionStorage.setItem("rollNO",rollNO);
    sessionStorage.setItem("class",cLass);
    sessionStorage.setItem("gender",gender);
    location.href = "/editstudent";
  })
  var btn2 = document.createElement("button");
  btn2.setAttribute("class","btn btn-danger");
  btn2.setAttribute("type","button");
  btn2.innerText="Delete"
  btn2.addEventListener("click",async()=>{
     await deleteStudent(id)
     await fetchstudent();
     tablerow.remove()
     location.reload();
  })
  //appending button
  tabledata5.appendChild(btn1);
  tabledata5.appendChild(btn2);
  //appending tabledata <td>
  tablerow.appendChild(tabledata1);
  tablerow.appendChild(tabledata2);
  tablerow.appendChild(tabledata3);
  tablerow.appendChild(tabledata4);
  tablerow.appendChild(tabledata5);
  //appending tablerow to tablebody 
  tablebody.append(tablerow);
}

const saveAttendence = ()=>{
  var arr = sessionStorage.getItem("arrayofstudents");
  var arrayofstudents = JSON.parse(arr)
  arrayofstudents.forEach(({},index)=>{
  var present = document.getElementById(`${index}true`);
  var absent = document.getElementById(`${index}false`);
  if(present.checked){
    arrayofstudents[index].attended = true;
  }
  else if (absent.checked) {
    arrayofstudents[index].attended = false;
  }
  console.log(index,present.checked,absent.checked);
  })
  console.log(arrayofstudents);
  attendenceToDB(arrayofstudents);
}

const attendenceToDB = (arrayofstudents)=>{ 
   var arr = JSON.stringify(arrayofstudents)
  // console.log("arr",arr);
  fetch("http://localhost:5000/attendenceToDB",{
     method:"POST",
     headers:{
       'Content-type':"application/json",
       "array":arr,
     }
   })
   .then(()=>{
     alert("saved");
   })
}

const getParticularDayAttendence=async()=>{
  var present=0,absent = 0,male=0,female=0;
  event.preventDefault()
  var sessionDate = document.getElementById("session-date").value;
  let str = sessionDate;
  var year = str.slice(0,4);
  var mon = str.slice(5,7);
  var day = str.slice(8,10);
  sessionDate=day+mon+year;
  console.log(sessionDate);

  var docRef = setGlobal.db.collection("AttendenceDB").doc(sessionDate);
  var totalDisplay = document.getElementById("total");
  var presentDisplay = document.getElementById("present");
  var absentDisplay = document.getElementById("absent");
  var maleDisplay = document.getElementById("boys");
  var femaleDisplay = document.getElementById("girls");
  var totalGenderDisplay = document.getElementById("totall");

  docRef.get().then((doc) => {
      if (doc.exists) {
        var array = doc.data().array;
        var data = JSON.parse(array)
          data.forEach(({attended,gender})=>{
            if (attended==true) {
              present++;
            }else if (!attended) {
              absent++
            }
            console.log(attended);
            if (gender=="male") {
              male++;
            }
            else if (gender=="female") {
              female++;
            }
          })
          var total =present+absent;
          var totalGenderCount = male+female
          totalDisplay.innerText=total;
          presentDisplay.innerText=present;
          absentDisplay.innerText=absent;
          totalGenderDisplay.innerText=totalGenderCount;
          maleDisplay.innerText=male;
          femaleDisplay.innerText=female;
      } else {
          alert("NO RECORD");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
      alert("UNABLE TO GET DATA !!!!")
  });
}

const editstudent = ()=>{
  event.preventDefault()
  var id = sessionStorage.getItem("id")
  var name  = document.getElementById("snameEdit").value;
  var rollNO  = document.getElementById("rollnoEdit").value;
  var cLass  = document.getElementById("classEdit").value;
  var male = document.getElementById("maleEdit");
  var female = document.getElementById("femaleEdit");
  var gender="gender";
  if (male.checked==true) {
    gender="male";
  }else if (female.checked==true) {
    gender="female";
  }

  fetch("http://localhost:5000/editstudentDB",{
     method:"POST",
     headers:{
       'Content-type':"application/json",
       "name":name,
       "prn":rollNO,
       "cLass":cLass,
       "gender":gender,
       "id":id
     }
   })
   .then(async (data)=>{
    await fetchstudent();
    name=" ";
    rollNO=" ";
    cLass=" ";
    alert("Student Edited");
    // location.href="http://localhost:5000/allstudent"
   })
   .catch((err)=>{alert(err);})
}

const editstudentOnload = ()=>{
  console.log("ok");
  var name  = document.getElementById("snameEdit");
  var rollNO  = document.getElementById("rollnoEdit");
  var cLass  = document.getElementById("classEdit");
  var male = document.getElementById("maleEdit");
  var female = document.getElementById("femaleEdit");
  name.value = sessionStorage.getItem("name");
  rollNO.value=sessionStorage.getItem("rollNO");
  cLass.value=sessionStorage.getItem("class");
  var gender = sessionStorage.getItem("gender");
  if (gender=="male") {
    male.checked=true;
  }
  else if (gender=="female") {
    female.checked=true;
  }
}

const forgetPassword=()=>{
  event.preventDefault();
  var email = document.getElementById("username").value;
  var params = {
    email:email,
  }
  if (email=="") {
    alert("Please Enter email");
    return
  }
   fetch("http://localhost:5000/forget",{
     method:"POST",
     headers:{
       'Content-type':"application/json",
       "email":JSON.stringify(params.email),
     }
   }).then(data=>{
     alert("Reset Link has been Sent!!!")
   })
}