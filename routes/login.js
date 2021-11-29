
var {getAuth,signInWithEmailAndPassword} = require("firebase/auth");

function login() {
    console.log("working");
  var email = "test@gmail.com";
  var password = "hunter2";

  const auth = getAuth()
  
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });
}

module.exports={login}