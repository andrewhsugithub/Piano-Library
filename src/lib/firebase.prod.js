import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// require("dotenv").config();
// import { seedDatabase } from "../seed";

const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
  // apiKey: "AIzaSyAvDZD8AefYuIyWlOXCIwbcFeqQ_t7oMUM",
  // authDomain: "pianotranscription-c8eac.firebaseapp.com",
  // projectId: "pianotranscription-c8eac",
  // storageBucket: "pianotranscription-c8eac.appspot.com",
  // messagingSenderId: "97287095498",
  // appId: "1:97287095498:web:98f542ca3611f448336033",
  // measurementId: "G-M34E70GJDL",
};
const firebase = Firebase.initializeApp(config);

// seedDatabase(firebase);

export { firebase };
