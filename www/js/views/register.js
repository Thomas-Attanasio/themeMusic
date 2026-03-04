import { loadCSS } from "../helpers.js";
import { navigateTo } from "../router.js";

// Import Firebase function
import { auth, db, createUserWithEmailAndPassword, doc, setDoc } from '../firebase/config.js';

export const initRegister = (container) => {
    // Manually load the CSS file
    loadCSS('css/auth.css');


    // HTML code
    container.innerHTML = `
        <div class='mainContainer'>
            <div class='headerContainer'>
                <h1>THEME MUSIC</h1>
                <p>Your theme, your music</p>
            </div>

            <div class='registerContainer'>
                <h1>Sign Up</h1>

                <form id='registerForm'>
                    <div class='inputGroup'>
                        <label for='username'>Username</label>
                        <input type='text' id='username' placeholder='Enter your username' required>

                        <span class='errorMessage' id='usernameError'></span>
                    </div>

                    <div class='inputGroup'>
                        <label for='email'>Email</label>
                        <input type='email' id='email' placeholder='Enter your email' required>

                        <span class='errorMessage' id='emailError'></span>
                    </div>

                    <div class='inputGroup'>
                        <label for='password'>Password</label>
                        <input type='password' id='password' placeholder='Enter your password' required>

                        <span class='errorMessage' id='passwordError'></span>
                    </div>

                    <span class='errorMessage' id='genericError'></span>

                    <button type='submit' class='formButton' id='registerButton'>Sign Up</button>
                </form>

                <p class='formLink'>Already have an account? <a href='#' id='goToLogin'>Login</a></p>
            </div>
        </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();


        // Get the user value
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const genericError = document.getElementById('genericError');

        try {
            // Create the user on Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;


            // Saving additional data into Firestore
            // Create a document in the 'users' collection having the ID equals to the Firebase Auth UID
            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                email: email,
                createdAt: new Date()
            });

            navigateTo('/login');
        } catch (error) {
            console.error('Registration error: ', error.code);

            switch (error.code) {
                case 'auth/email-already-in-use':
                    document.getElementById('emailError').innerText = 'This email already exists';
                    break;
                case 'auth/weak-password':
                    document.getElementById('passwordError').innerText = 'Password too weak (min. 6 characters)';
                    break;
                default:
                genericError.innerText = 'Error during the registration';
                break;
            }
        }
    });


    document.getElementById('goToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/login');
    });
};