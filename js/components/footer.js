export function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';

    const now = new Date();
    const year = now.getFullYear();
    footer.innerHTML = `
    <div class="footer-container">
        <p>&copy; ${year}. All rights reserved.</p>
    </div>
    `;
    
    return footer;
}