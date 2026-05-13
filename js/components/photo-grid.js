import { BASE_URL } from '../api.js';

// Render a grid of clickable photo thumbnails that can open in the lightbox.
export function renderPhotoGrid(photos) {
    const grid = document.createElement('div');
    grid.classList.add('photo-grid');

    // Build a clickable tile for each photo in the list.
    photos.forEach((photo, index) => {
        // Wrap each image in a container for styling and click handling.
        const wrapper = document.createElement('div');
        wrapper.classList.add('photo-grid-item');

        // Load the thumbnail from the API base URL.
        const img = document.createElement('img');
        img.src = `${BASE_URL}${photo.url}`;
        // Use the photo caption if available, otherwise a generic fallback.
        img.alt = photo.caption || 'gallery photo';

        wrapper.appendChild(img);

        wrapper.addEventListener('click', () => {
            // Instead of opening the lightbox here, publish an app-level event.
            // This keeps the grid focused on rendering and lets the lightbox stay decoupled.
            document.dispatchEvent(new CustomEvent('open-lightbox', {
                // Pass the full photo list plus the clicked index so the lightbox
                // can show the current image and still support next/previous navigation.
                detail: { photos, index }
            }));
        });

        grid.appendChild(wrapper);
    });

    return grid;
}

