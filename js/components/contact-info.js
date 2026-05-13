export function renderContactInfo(contact) {
    const section = document.createElement('section');
    section.className = 'home-contact';

    const heading = document.createElement('h2');
    heading.className = 'contact-heading';
    heading.textContent = 'Contact';
    section.appendChild(heading);

    if (!contact) {
        const error = document.createElement('p');
        error.className = 'contact-subtitle';
        error.textContent = 'Contact info could not be loaded.';
        section.appendChild(error);
        return section;
    }

    if (contact.bookingNote) {
        const subtitle = document.createElement('p');
        subtitle.className = 'contact-subtitle';
        subtitle.textContent = contact.bookingNote;
        section.appendChild(subtitle);
    }

    if (contact.email) {
        const emailLink = document.createElement('a');
        emailLink.className = 'contact-email-link';
        emailLink.href = `mailto:${contact.email}`;
        emailLink.textContent = contact.email;
        section.appendChild(emailLink);
    }

    const socials = document.createElement('div');
    socials.className = 'contact-socials';
    socials.innerHTML = `
        <a href="https://www.facebook.com/STUGGofficial/" class="social-btn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/stuggofficial/" class="social-btn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.youtube.com/@stuggofficial6124" class="social-btn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>
        <a href="https://open.spotify.com/artist/6faOKb101lzOAatluvBUNs" class="social-btn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-spotify"></i></a>
    `;
    section.appendChild(socials);

    return section;
}
