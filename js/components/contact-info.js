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

    const list = document.createElement('dl');
    list.className = 'contact-list';

    if (contact.bookingEmail) {
        const dt = document.createElement('dt');
        dt.textContent = 'Management';
        const dd = document.createElement('dd');
        const link = document.createElement('a');
        link.href = `mailto:${contact.bookingEmail}`;
        link.textContent = contact.bookingEmail;
        dd.appendChild(link);
        list.appendChild(dt);
        list.appendChild(dd);
    }

    if (contact.email) {
        const dt = document.createElement('dt');
        dt.textContent = 'Band';
        const dd = document.createElement('dd');
        const link = document.createElement('a');
        link.href = `mailto:${contact.email}`;
        link.textContent = contact.email;
        dd.appendChild(link);
        list.appendChild(dt);
        list.appendChild(dd);
    }

    section.appendChild(list);
    return section;
}
