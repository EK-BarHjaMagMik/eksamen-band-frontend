import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";

// Map URL hash paths to the page module that should be loaded for that route.
const routes = {
    '/': { module: './pages/home.js' },
    '/photos': { module: './pages/photos.js' },
};

async function handleRoute() {
    // Read the current hash and split out any query string parameters.
    const hash = window.location.hash || '#/';
    const [path, queryString] = hash.slice(1).split('?');
    const params = new URLSearchParams(queryString);

    // Fall back to the home route when no matching path exists.
    const route = routes[path] || routes['/'];

    try {
        // Load the page module on demand and let the page render into #content.
        const { default: page } = await import(route.module);
        const content = document.getElementById('content');
        content.innerHTML = '';
        await page.render(content, params);
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
    }
}

function renderLayout() {
    // Rebuild the shared header and footer each time the app boots.
    const headerRoot = document.getElementById('header-root');
    const footerRoot = document.getElementById('footer-root');

    headerRoot.replaceChildren();
    footerRoot.replaceChildren();

    // Insert the current header and footer components into the layout shell.
    headerRoot.appendChild(renderHeader());
    footerRoot.appendChild(renderFooter());
}

// Render the layout once, then update the page content whenever the hash changes.
window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", renderLayout);
window.addEventListener("load", handleRoute);

// Programmatic navigation works by updating the hash, which triggers routing.
export function navigate(path) {
    window.location.hash = path;
}