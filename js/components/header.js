export function renderHeader() {
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
    <div class="header-container">
        <h1 class="logo"><a href="#/">Stügg</a></h1>
        <nav class="site-nav">
            <a href="#/">Home</a>
        </nav>
    </div>
    `;
    
    return header;
}