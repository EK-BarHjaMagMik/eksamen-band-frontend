export function renderUpcomingShows(shows) {
    const safeShows = Array.isArray(shows) ? shows : [];

    const section = document.createElement('section');
    section.className = 'upcoming-shows';

    const heading = document.createElement('h2');
    heading.textContent = 'Upcoming Shows';
    section.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'shows-list';
    section.appendChild(list);

    if (safeShows.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'no-shows';
        empty.textContent = 'No upcoming gigs at the moment. Check back soon!';
        list.appendChild(empty);
        return section;
    }

    safeShows.forEach(show => {
        const row = document.createElement('div');
        row.className = 'show-row';

        const date = document.createElement('span');
        date.className = 'show-date';
        date.textContent = show.date;

        const city = document.createElement('span');
        city.className = 'show-city';
        city.textContent = show.city;

        const venue = document.createElement('span');
        venue.className = 'show-venue';
        venue.textContent = show.venue;

        row.appendChild(date);
        row.appendChild(city);
        row.appendChild(venue);

        if (show.ticketLink) {
            const link = document.createElement('a');
            link.href = show.ticketLink;
            link.textContent = 'Tickets';
            link.className = 'tickets-btn';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            row.appendChild(link);
        } else {
            row.appendChild(document.createElement('span'));
        }

        list.appendChild(row);
    });

    return section;
}
