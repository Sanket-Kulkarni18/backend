var {getAuth,signInWithEmailAndPassword,signOut,sendPasswordResetEmail} = 

require("firebase/auth");


const isSignedIN=async(email,password)=> {
  console.log("working",email,password);
  var isUSER = false;
  var auth = getAuth()
  var g_email = email
  var g_pass = password
 await signInWithEmailAndPassword(auth, g_email, g_pass)
  .then((userCredential) => {
    const user = userCredential.user;
    if (user) {
       isUSER = true;
    }
    console.log("secondary",isUSER);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    isUSER=false
    console.log(errorCode);
    console.log("s",isUSER);
  });

  return isUSER
}



const logout = async()=>{
  var auth = getAuth();
 await signOut(auth).then(() => {
  return true;
}).catch((error) => {
  return false;
});
}

const forgetPassword=(email)=>{
  var auth = getAuth()
sendPasswordResetEmail(auth, email)
.then(() => {
  console.log("okforget");
return true
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
console.log("forrr",errorCode);
return false;
});
}

module.exports={isSignedIN,logout,forgetPassword}