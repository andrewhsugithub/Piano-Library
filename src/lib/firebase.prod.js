import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyDr44_QwrQVWku0IkPjIh99ltCMMQpp2W4",
  authDomain: "piano-transcription-72342.firebaseapp.com",
  projectId: "piano-transcription-72342",
  storageBucket: "piano-transcription-72342.appspot.com",
  messagingSenderId: "567301018962",
  appId: "1:567301018962:web:600056042aa2777af5968b",
  measurementId: "G-K48W0QF7RN",
};
const firebase = Firebase.initializeApp(config);

// seedDatabase(firebase);

export { firebase };
