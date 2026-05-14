export function renderContactInfo(contact) {
    const section = document.createElement('section');
    section.className = 'home-contact';

    const heading = document.createElement('h2');
    heading.className = 'contact-heading';
    heading.textContent = 'Contact';
    section.appendChild(heading);

    if (!contact) {
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

    return section;
}
