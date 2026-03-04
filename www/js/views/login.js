import { navigateTo } from '../router.js';
import { loadCSS } from '../helpers.js';

export const initLogin = (container) => {
    // Manually load the CSS file
    loadCSS('css/auth.css');


    // HTML code
    container.innerHTML = `
        <div class='mainContainer'>
            <div class='headerContainer'>
                <h1>THEME MUSIC</h1>
                <p>Your music, your theme</p>
            </div>

            <div class='loginContainer'>
                <h1>Login in your account</h1>

                <form id='loginForm'>
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

                    <button type='submit' class='formButton' id='loginButton'>Login</button>
                </form>

                <p class='formLink'>Don't have an account? <a href='#' id='goToRegister'>Sign Up</a></p>
            </div>
        </div>
    `;

    document.getElementById('goToRegister').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/register');
    });
};