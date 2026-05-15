export function renderContactInfo(contact) {
    const section = document.createElement('section');
    section.classList.add('home-section', 'contact-section');

    const heading = document.createElement('h2');
    heading.className = 'section-heading';
    heading.textContent = 'Contact';
    section.appendChild(heading);

    if (!contact) return section;

    const columns = document.createElement('div');
    columns.className = 'contact-columns';

    if (contact.email) {
        columns.appendChild(buildContactCol('General Inquiries', contact.emailNote, contact.email));
    }

    if (contact.bookingEmail) {
        columns.appendChild(buildContactCol('Booking & Press', contact.bookingNote, contact.bookingEmail));
    }

    section.appendChild(columns);
    return section;
}

function buildContactCol(label, description, email) {
    const col = document.createElement('div');
    col.className = 'contact-col';

    const labelEl = document.createElement('span');
    labelEl.className = 'contact-col-label';
    labelEl.textContent = label;
    col.appendChild(labelEl);

    const desc = document.createElement('p');
    desc.className = 'contact-col-desc';
    desc.textContent = description ?? '';
    col.appendChild(desc);

    const link = document.createElement('a');
    link.className = 'contact-col-email';
    link.href = `mailto:${email}`;
    link.textContent = email;
    col.appendChild(link);

    return col;
}
