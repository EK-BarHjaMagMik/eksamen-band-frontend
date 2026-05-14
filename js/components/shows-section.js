import { renderUpcomingShows } from './upcoming-shows.js';
import { renderPastShows } from './past-shows.js';

export function renderShowsSection(upcomingShows, pastShows) {
    const section = document.createElement('section');
    section.className = 'shows-section';

    const heading = document.createElement('h2');
    heading.className = 'section-heading';
    heading.textContent = 'Shows';
    section.appendChild(heading);

    const toggleSection = document.createElement('div');
    toggleSection.className = 'toggle-section';

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = 'See Past Shows';

    const upcomingSection = renderUpcomingShows(upcomingShows);
    upcomingSection.id = 'tour';

    const pastShowsSection = renderPastShows(pastShows);
    pastShowsSection.id = 'past-shows';
    pastShowsSection.classList.add('hidden');

    toggleBtn.addEventListener('click', () => {
        const showingUpcoming = !upcomingSection.classList.contains('hidden');

        upcomingSection.classList.toggle('hidden');
        pastShowsSection.classList.toggle('hidden');
        toggleBtn.textContent = showingUpcoming ? 'See Upcoming Shows' : 'See Past Shows';
    });

    toggleSection.appendChild(toggleBtn);
    section.appendChild(toggleSection);
    section.appendChild(upcomingSection);
    section.appendChild(pastShowsSection);

    return section;
}