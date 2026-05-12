export function renderPastShows(shows) {
  const safeShows = Array.isArray(shows) ? shows : [];

  const section = document.createElement('section');
  section.className = "past-shows";

  const heading = document.createElement('h2');
  heading.textContent = 'Past Shows';
  section.appendChild(heading);

}