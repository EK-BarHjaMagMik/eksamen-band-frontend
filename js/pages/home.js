import { renderHero } from '../components/hero.js';
import { renderUpcomingShows } from '../components/upcomingShows.js';
import {getUpcomingShows} from "../services/showService.js";

export async function render(container, params) {
    container.appendChild(renderHero());

    const shows = await getUpcomingShows();
    container.appendChild(renderUpcomingShows(shows));
}

export default { render };