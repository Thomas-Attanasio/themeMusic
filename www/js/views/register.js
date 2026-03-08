import { loadCSS } from "../helpers.js";
import { navigateTo } from "../router.js";

// Import Firebase function
import { auth, db, createUserWithEmailAndPassword, doc, setDoc, query, where, collection, getDocs } from '../firebase/config.js';

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

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    let timeout = null;


    // Check if there's any duplicate
    const checkDuplicate = (field, value, errorElement, inputElement, message) => {
        clearTimeout(timeout);

        errorElement.textContent = '';
        inputElement.style.borderColor = '';
        inputElement.style.boxShadow = '';

        const val = value.trim();

        if (val.length < 3 ) return;

        timeout = setTimeout(async () => {
            try {
                // Create a query to check if theere is any duplicate in the 'users' collection
                const q = query(collection(db, 'users'), where(field, '==', value.trim()));
                const querySnapshot = await getDocs(q);

                
                // If the query it's not empty return an error
                if (!querySnapshot.empty) {
                    errorElement.textContent = message;
                    inputElement.style.borderColor = 'red';
                }else {
                    inputElement.style.borderColor = 'green';
                }
            } catch (error) {
                console.error(`Error checking ${field}: `, error);
            }
        }, 500);
    };


    // Real time username error
    usernameInput.addEventListener('input', () => {
        checkDuplicate('username', usernameInput.value, usernameError, usernameInput, 'Username already taken');
    });

    // Real time email error
    emailInput.addEventListener('input', () => {
        checkDuplicate('email', emailInput.value, emailError, emailInput, 'Email already exists');
    });

    // Real time password error
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value.trim();

        passwordError.textContent = '';
        passwordInput.style.borderColor = '';

        if (password.length === 0) return;

        try {
            if (password.length < 6) {
                passwordError.textContent = 'Password too weak (min. 6 characters)';
                passwordInput.style.borderColor = 'red';
            } else {
                passwordError.textContent = '';
                passwordInput.style.borderColor = 'green';
            }
        } catch (error) {
            console.error('Error checking password: ', error);
        }
    });


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
                    document.getElementById('emailError').innerText = 'Email already exists';
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