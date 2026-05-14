import { renderHero } from '../components/hero.js';
import { renderUpcomingShows } from '../components/upcoming-shows.js';
import { renderContactInfo } from '../components/contact-info.js';
import { getUpcomingShows } from "../services/show-service.js";
import { getContactInfo } from "../services/contact-service.js";
import { getRecentPhotos } from "../services/photo-service.js";
import { renderPhotoSection } from '../components/photos.js';

export async function render(container, params) {
    container.appendChild(renderHero());

    const [shows, contact, photos] = await Promise.all([
        getUpcomingShows().catch(err => { console.error('Failed to load upcoming shows:', err); return []; }),
        getContactInfo().catch(err => { console.error('Failed to load contact info:', err); return null; }),
        getRecentPhotos().catch(err => { console.error('Failed to load photos:', err); return []; })
    ]);

    const showsSection = renderUpcomingShows(shows);
    showsSection.id = 'tour';
    container.appendChild(showsSection);

    // TODO: EKS-XX news section (2×2 card grid with headline, image, date, excerpt)
    // TODO: EKS-XX photos section (3×2 grid + "view all photos" button)
    const photoSection = renderPhotoSection(photos);
    photoSection.id = 'photos';
    container.appendChild(photoSection);

    const contactSection = renderContactInfo(contact);
    contactSection.id = 'contact';
    container.appendChild(contactSection);
}

export default { render };
