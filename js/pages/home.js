import { renderHero } from '../components/hero.js';
import { renderUpcomingShows } from '../components/upcoming-shows.js';
import { renderContactInfo } from '../components/contact-info.js';
import { getUpcomingShows } from "../services/show-service.js";
import { getContactInfo } from "../services/contact-service.js";
import { getRecentPhotos } from "../services/photo-service.js";
import { renderPhotoSection } from '../components/photos.js';
import { createLightbox, openLightbox } from '../components/lightbox.js';

// Create the lightbox once when the module loads
createLightbox();

// Register once at module scope — not inside render() — to avoid accumulating listeners.
document.addEventListener('open-lightbox', e => {
    openLightbox(e.detail.photos, e.detail.index);
});

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
    const photoSection = renderPhotoSection(photos);
    if (photoSection) {
        photoSection.id = 'photos';
        container.appendChild(photoSection);
    }

    const contactSection = renderContactInfo(contact);
    contactSection.id = 'contact';
    container.appendChild(contactSection);
}

export default { render };
