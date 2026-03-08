import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import {
    getFirestore, doc, setDoc, query, where, collection, getDocs 
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { firebaseConfig } from '../secret.js';


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize the Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);


// Export the Firebase function
export {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    doc,
    setDoc,
    query,
    where,
    collection,
    getDocs
};