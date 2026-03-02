import { render } from "./router.js";


// When the app is loaded
window.addEventListener('DOMContentLoaded', () => {
    if (!window.location.hash || window.location.has === '#') {
        // Set the hash, if there's not
        // This block of code will trigger the 'haschange' listener in the 'router.js' file
        window.location.hash = '/';
    } else {
        // Render the current hash, if there is
        render();
    }
});