import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { firebaseConfig } from '../secret.js';


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize the Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);


// Export the services
export { auth, db }