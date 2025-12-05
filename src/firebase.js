import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAyoYHAWWVDjCE7r-rI6lLFKU4PduVZfds",
  authDomain: "netflix-clone-96ed8.firebaseapp.com",
  projectId: "netflix-clone-96ed8",
  storageBucket: "netflix-clone-96ed8.firebasestorage.app",
  messagingSenderId: "395914943223",
  appId: "1:395914943223:web:864e099e32d294d478d1f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth()
const db = getFirestore();

async function signUp(name, email, password){
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

async function logIn(email, password){
    try{
         await signInWithEmailAndPassword(auth, email, password);
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

async function logOut(){
    signOut(auth)
}

export {auth, db, logIn, signUp, logOut}