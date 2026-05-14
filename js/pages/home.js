import { renderHero } from '../components/hero.js';
import { renderUpcomingShows } from '../components/upcoming-shows.js';
import { getPastShows} from '../services/show-service.js';
import { renderPastShows} from '../components/past-shows.js';
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

    const [shows, pastShows, contact, photos] = await Promise.all([
        getUpcomingShows().catch(err => { console.error('Failed to load upcoming shows:', err); return []; }),
        getPastShows().catch(err => { console.error('Failed to load past shows:', err); return []; }),
        getContactInfo().catch(err => { console.error('Failed to load contact info:', err); return null; }),
        getRecentPhotos().catch(err => { console.error('Failed to load photos:', err); return []; })
    ]);

    //  suspecting we might need to appendchild/structure differently
    // in order to get "See Shows" button properly alligned with the
    // Upcoming/past shows section. believe i tried everything in css.
    const toggleSection = document.createElement('div');
    const toggleBtn = document.createElement('button');
    toggleSection.className = 'toggle-section';
    toggleBtn.className = 'toggle-btn';
    toggleBtn.textContent = 'See Past Shows';
    toggleSection.appendChild(toggleBtn);
    container.appendChild(toggleSection);

    toggleBtn.addEventListener("click", () => {
        showsSection.classList.toggle('hidden');
        pastShowsSection.classList.toggle('hidden');
        if (showsSection.classList.contains('hidden')) {
            toggleBtn.textContent = 'See Upcoming Shows';
        } else {
        toggleBtn.textContent = 'See Past Shows';
        }
    });

    const showsSection = renderUpcomingShows(shows);
    showsSection.id = 'tour';
    container.appendChild(showsSection);

    const pastShowsSection = renderPastShows(pastShows);
    pastShowsSection.classList.add('hidden');
    pastShowsSection.id = 'past-shows';
    container.appendChild(pastShowsSection);



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
