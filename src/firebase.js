import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//firebase configuration

const app = initializeApp({
  apiKey: "AIzaSyAKXaR3qpIpOuqyK6FaaEfTw0ZJyM-QMmU",
  authDomain: "react-quiz-dev-99bc2.firebaseapp.com",
  projectId: "react-quiz-dev-99bc2",
  storageBucket: "react-quiz-dev-99bc2.appspot.com",
  messagingSenderId: "521724182916",
  appId: "1:521724182916:web:71ae60c000930ad8cc5dd1",
  databaseURL: "https://react-quiz-dev-99bc2-default-rtdb.asia-southeast1.firebasedatabase.app",
  authorizarion:"563492ad6f91700001000001d026dba5e7ef421d9ccad72b7e2185c1",




});


export const auth = getAuth(app);

export default app




// apiKey:process.env.REACT_APP_API_KEY,
//   authDomain:process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId:process.env.REACT_APP_MESSASING_SENDER_ID,
//   appId:process.env.REACT_APP_ID,
//   databaseURL:process.env.REACT_APP_DATABASE_URL
