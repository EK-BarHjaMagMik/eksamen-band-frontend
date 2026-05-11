export function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';

    const now = new Date();
    const year = now.getFullYear();
    footer.innerHTML = `
    <div class="footer-container">
      <h2 class="footer-heading">Contact</h2>
      <a href="mailto:stuggofficial@gmail.com" class="footer-email">booking@stugg.dk</a>
      <div class="footer-socials">
          <a href="https://www.facebook.com/STUGGofficial/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/stuggofficial/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/@stuggofficial6124" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://open.spotify.com/artist/6faOKb101lzOAatluvBUNs" target="_blank" rel="noopener noreferrer">Spotify</a>
      </div>
      <p>&copy; ${year}. All rights reserved.</p>
  </div>
    `;
    
    return footer;
}