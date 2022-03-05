// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA3HF_DLR8nTVZVJHGqWMZn4l2f-Npj8Ew",
  authDomain: "modern-react-app-a9bcd.firebaseapp.com",
  projectId: "modern-react-app-a9bcd",
  storageBucket: "modern-react-app-a9bcd.appspot.com",
  messagingSenderId: "18914204349",
  appId: "1:18914204349:web:4b568c67d981c31d5cb5d4"
};

initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()

export {db,auth}