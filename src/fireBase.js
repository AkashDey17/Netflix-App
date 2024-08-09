import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBUxYBDuc_tCyC82xJZ-L-tqDYeKWoru8Y",
  authDomain: "netflix-app-27b82.firebaseapp.com",
  projectId: "netflix-app-27b82",
  storageBucket: "netflix-app-27b82.appspot.com",
  messagingSenderId: "901903303815",
  appId: "1:901903303815:web:207c213cc21186ee42a422"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name , email , password) => {
     try {
     const res =   await createUserWithEmailAndPassword(auth , email , password)
     const user = res.user;
     await addDoc(collection(db , "user"), {
        uid : user.displayName,
        name,
        authProvider : "local",
        email
     })
     } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const login = async  (email, password) => {
  try {
  await  signInWithEmailAndPassword(auth , email, password)
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () => {
    signOut(auth)
}

export {auth , db , login , signup , logout}