import { getPhotos } from '../services/photo-service.js';
import { renderPhotoGrid } from '../components/photo-grid.js';
import { createLightbox, openLightbox } from '../components/lightbox.js';
import { navigate } from '../router.js';

let photoState = null;        // cached photos
let currentFilter = null;     // last used showId

// Create the lightbox once when the module loads
createLightbox();

// Register once at module scope — not inside render() — to avoid accumulating listeners.
document.addEventListener('open-lightbox', e => {
    openLightbox(e.detail.photos, e.detail.index);
});

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
            photoState = Array.isArray(photos) ? photos : [];
            currentFilter = showId;
        }

        if (loading) loading.remove();

        // Render the page title and the current photo set.
        const header = document.createElement('h1');
        header.classList.add('page-title');
        header.textContent = 'Photos';
        container.appendChild(header);

        // If a show filter is active, render a small filter bar with a clear button.
        if (showId) {
            const filterBar = document.createElement('div');
            filterBar.className = 'filter-bar';

            // Simple label
            const label = document.createElement('span');
            label.className = 'filter-text';
            label.innerHTML = `Filtered by show`;

            const clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'btn';
            clearBtn.textContent = 'Clear filter';
            clearBtn.addEventListener('click', () => navigate('/photos'));

            filterBar.appendChild(label);
            filterBar.appendChild(clearBtn);
            container.appendChild(filterBar);
        }
        
        const grid = renderPhotoGrid(photoState);
        container.appendChild(grid);

    } catch (err) {
        // Keep the loading placeholder in place and turn it into an error message.
        if (loading) {
            loading.textContent = 'Failed to load photos.';
            loading.classList.add('error-text');
        }
        console.error(err);
    }
}

export default { render };