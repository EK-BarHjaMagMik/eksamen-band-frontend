import { renderHero } from '../components/hero.js';
import { renderUpcomingShows } from '../components/upcomingShows.js';
import { getUpcomingShows } from "../services/showService.js";

export async function render(container, params) {
    container.appendChild(renderHero());

    let shows = [];
    try {
        shows = await getUpcomingShows();
    } catch (error) {
        console.error('Failed to load upcoming shows:', error);
    }
    container.appendChild(renderUpcomingShows(shows));
}

export default { render };