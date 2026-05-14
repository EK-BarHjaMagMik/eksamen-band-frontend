export function renderPastShows(shows) {
  const safeShows = Array.isArray(shows) ? shows : [];

  const section = document.createElement('section');
  section.className = 'past-shows';

  const heading = document.createElement('h2');
  heading.textContent = 'Past Shows';
  section.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'past-shows-list';
  section.appendChild(list);

  if (safeShows.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'no-past-shows';
    empty.textContent = 'No past gigs registered at the moment. Check back soon!';
    list.appendChild(empty);
    return section;
  }

  safeShows.forEach(show => {
    const row = document.createElement('div');
    row.className = 'past-show-row';

    const date = document.createElement('span');
    date.className = 'past-show-date';
    date.textContent = show.date;

    const city = document.createElement('span');
    city.className = 'past-show-city';
    city.textContent = show.city;

    const venue = document.createElement('span');
    venue.className = 'past-show-venue';
    venue.textContent = show.venue;

    row.appendChild(date);
    row.appendChild(city);
    row.appendChild(venue);

    list.appendChild(row);
  });

  return section;
}