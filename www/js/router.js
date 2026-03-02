import { initLogin } from "./views/login.js";
import { initRegister } from "./views/register.js";


// Define the routes
const routes = {
    '/': initLogin,
    '/register': initRegister
};


// Function to change the view
export const navigateTo = (path) => {
    // Change the URL without reloading the page
    window.history.pushState({}, path, window,location.origin + path);

    // Render logic
    render(path);
};

const render = (path) => {
    const appContainer = document.getElementById('app');

    // Clear the container
    appContainer.innerHTML = '';


    // Find the relative routes function
    const initView = routes[path];

    if (initView) {
        // Load the HTML
        initView(appContainer);
    } else {
        appContainer.innerHTML = `<h1>404 - Page not found</h1>`
    }
};


// Manage the browser and smartphone back button
window.addEventListener('popstate', () => {
    render(window.location.pathname);
});