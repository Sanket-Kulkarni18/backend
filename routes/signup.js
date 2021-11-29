
var {getAuth,createUserWithEmailAndPassword} = require("firebase/auth");

function signUpWithEmailPassword() {
    console.log("working");
  var email = "test@gmail.com";
  var password = "hunter2";

  const auth = getAuth()
  
  createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      
      var user = userCredential.user;
      console.log(user);
      
    })
    .catch((error) => {
      
      console.log("errrrr",error);
  
    });
}

module.exports={signUpWithEmailPassword}