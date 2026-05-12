export function renderUpcomingShows(shows) {
    const section = document.createElement('section');
    section.className = 'upcoming-shows';

    section.innerHTML = `                                                                                                                                                             
          <h2>Upcoming Shows</h2>
          <div class="shows-list">
              ${shows.length === 0
                  ? `<p class="no-shows">No upcoming gigs at the moment. Check back soon!</p>`
                  : shows.map(show => `
                  <div class="show-row">
                      <span class="show-date">${show.date}</span>
                      <span class="show-city">${show.city}</span>
                      <span class="show-venue">${show.venue}</span>
                      ${show.ticketLink
                          ? `<a href="${show.ticketLink}" target="_blank" class="tickets-btn">Tickets</a>`
                          : `<span class="no-tickets">—</span>`
                      }
                  </div>
              `).join('')}
          </div>
      `;

    return section;
}