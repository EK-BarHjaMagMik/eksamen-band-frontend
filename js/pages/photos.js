import { getPhotos } from '../services/photo-service.js';
import { renderPhotoGrid } from '../components/photo-grid.js';

let photoState = null;
let currentFilter = null;

export async function render(container, params) {

    const showId = params?.get('showId') || null;

    // Reuse the cached list until the active filter changes.
    const shouldFetch =
        !photoState ||
        currentFilter !== showId;

    let loading = null;
    if (shouldFetch) {
        // Show a lightweight loading state only when we are actually fetching.
        loading = document.createElement('p');
        loading.textContent = 'Loading photos...';
        loading.classList.add('loading-text');
        container.appendChild(loading);
    }

    try {
        if (shouldFetch) {
            const photos = await getPhotos(showId);
            photoState = photos;
            currentFilter = showId;
        }

        if (loading) loading.remove();

        // Render the page title and the current photo set.
        const header = document.createElement('h1');
        header.classList.add('page-title');
        header.textContent = 'Photos';
        container.appendChild(header);

        container.appendChild(renderPhotoGrid(photoState));

    } catch (err) {
        // Keep the loading placeholder in place and turn it into an error message.
        if (loading) {
            loading.textContent = 'Failed to load photos.';
            loading.classList.add('error-text');
        }
        console.error(err);
    }
}
