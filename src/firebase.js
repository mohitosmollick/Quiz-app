import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//firebase configuration

const app = initializeApp({
 
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSASING_SENDER_ID,
  appId:process.env.REACT_APP_ID,
  databaseURL:process.env.REACT_APP_DATABASE_URL




});


export const auth = getAuth(app);

export default app





