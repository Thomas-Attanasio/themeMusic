import { initLogin } from "./views/login.js";
import { initRegister } from "./views/register.js";


// Define the routes
const routes = {
    '/': initLogin,
    '/register': initRegister
};


// Function to change the view
export const navigateTo = (path) => {
    window.location.hash = path;
};

const render = () => {
    const appContainer = document.getElementById('app');

    // Clear the container
    appContainer.innerHTML = '';


    // Obtaine the current hash (es. '#/register') and remove the '#' symbol
    // If the has is empty, use '/' as default
    const path = window.location.hash.replace('#', '') || '/';


    // Find the relative routes function
    const initView = routes[path];

    if (initView) {
        // Load the HTML
        initView(appContainer);
    } else {
        appContainer.innerHTML = `<h1>404 - Page not found</h1>`
    }
};


// Mange the has changes
window.addEventListener('hashchange', render);


export { render };