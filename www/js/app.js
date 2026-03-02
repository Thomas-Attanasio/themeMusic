import { navigateTo } from "./router.js";


// When the app is loaded, check where is it the user
window.addEventListener('DOMContentLoaded', () => {
    // If it's the first time, load the current routes or the login routes
    const currentPath = window.location.pathname || '/';
    navigateTo(currentPath);
});