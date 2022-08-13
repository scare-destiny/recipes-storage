import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLJtMYt6rlArHejqMlsQknDjPrJhpj_ww",
  authDomain: "recipe-app-13554.firebaseapp.com",
  databaseURL: "https://recipe-app-13554-default-rtdb.firebaseio.com",
  projectId: "recipe-app-13554",
  storageBucket: "recipe-app-13554.appspot.com",
  messagingSenderId: "408634837228",
  appId: "1:408634837228:web:9f045a0e00d51b0b727dc9"
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
