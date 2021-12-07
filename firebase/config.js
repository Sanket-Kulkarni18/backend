var firebase = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyBBZ4WeXoCzVO_EvjZNLOHETdpK5lsYF7E",
    authDomain: "oyster-kode-attendence.firebaseapp.com",
    projectId: "oyster-kode-attendence",
    storageBucket: "oyster-kode-attendence.appspot.com",
    messagingSenderId: "772988200926",
    appId: "1:772988200926:web:7db391271b14f730ba9f4f",
    measurementId: "G-2PM01W0D03"
  };

 const app=firebase.initializeApp(firebaseConfig) 

module.exports={firebaseConfig,app};
