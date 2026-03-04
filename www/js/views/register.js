import { loadCSS } from "../helpers.js";
import { navigateTo } from "../router.js";

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

                    <button type='submit' class='formButton' id='registerButton'>Sign Up</button>
                </form>

                <p class='formLink'>Already have an account? <a href='#' id='goToLogin'>Login</a></p>
            </div>
        </div>
    `;

    document.getElementById('goToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('/login');
    });
};