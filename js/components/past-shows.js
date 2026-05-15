export function renderPastShows(shows) {
  const safeShows = Array.isArray(shows) ? shows : [];

  const list = document.createElement('div');
  list.className = 'shows-list';

  if (safeShows.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'no-shows';
    empty.textContent = 'No past gigs registered at the moment. Check back soon!';
    list.appendChild(empty);
    return list;
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

    if (show.hasPhotos) {
      const link = document.createElement('a');
      link.href = `#/photos?showId=${show.id}`;
      link.textContent = 'Photos';
      link.className = 'btn';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      row.appendChild(link);
    } else {
      row.appendChild(document.createElement('span'));
    }

    list.appendChild(row);
  });

  return list;
}