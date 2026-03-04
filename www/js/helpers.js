export const loadCSS = (href, id = 'viewStyle') => {
    // If there's already a CSS file with the same ID, remove it and load the new one
    const existingLink = document.getElementById(id);
    if (existingLink) {
        existingLink.remove();
    }

    
    // Create the new link element for the HTML
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}