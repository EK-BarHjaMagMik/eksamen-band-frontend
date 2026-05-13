export function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';

    const year = new Date().getFullYear();
    const copy = document.createElement('p');
    copy.textContent = `© ${year} STÜGG. All rights reserved.`;
    footer.appendChild(copy);

    return footer;
}
