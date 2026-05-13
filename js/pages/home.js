import { renderHero } from '../components/hero.js';
import { renderUpcomingShows } from '../components/upcoming-shows.js';
import { renderContactInfo } from '../components/contact-info.js';
import { getUpcomingShows } from "../services/show-service.js";
import { getContactInfo } from "../services/contact-service.js";

export async function render(container, params) {
    container.appendChild(renderHero());

    let shows = [];
    try {
        shows = await getUpcomingShows();
    } catch (error) {
        console.error('Failed to load upcoming shows:', error);
    }
    const showsSection = renderUpcomingShows(shows);
    showsSection.id = 'tour';
    container.appendChild(showsSection);

    // TODO: EKS-XX news section (2×2 card grid with headline, image, date, excerpt)
    // TODO: EKS-XX photos section (3×2 grid + "view all photos" button)

    let contact = null;
    try {
        contact = await getContactInfo();
    } catch (error) {
        console.error('Failed to load contact info:', error);
    }
    const contactSection = renderContactInfo(contact);
    contactSection.id = 'contact';
    container.appendChild(contactSection);
}

export default { render };
