import { BASE_URL } from '../api.js';

let currentIndex = 0;
let photos = [];

export function createLightbox() {
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');

    // Build the overlay once and reuse it for all photo selections.
    overlay.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <img class="lightbox-image" />
            <button class="lightbox-prev">‹</button>
            <button class="lightbox-next">›</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Clicking the dimmed backdrop should close the overlay.
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeLightbox();
    });

    // Wire the controls to the shared lightbox state.
    overlay.querySelector('.lightbox-close')
        .addEventListener('click', closeLightbox);

    overlay.querySelector('.lightbox-prev')
        .addEventListener('click', () => showImage(currentIndex - 1));

    overlay.querySelector('.lightbox-next')
        .addEventListener('click', () => showImage(currentIndex + 1));

    // Track touch position for swipe gesture detection on mobile.
    let startX = 0;

    overlay.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    // Detect horizontal swipes to navigate between photos on touch devices.
    overlay.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        // Only register swipes that are at least 50 pixels in distance.
        if (Math.abs(diff) > 50) {
            if (diff < 0) showImage(currentIndex + 1);  // swipe left → next
            else showImage(currentIndex - 1);           // swipe right → prev
        }
    });

    return overlay;
}

export function openLightbox(photoList, index) {
    photos = photoList;
    currentIndex = index;

    const overlay = document.querySelector('.lightbox-overlay');
    overlay.classList.add('active');

    // Show the selected image immediately when the lightbox opens.
    showImage(index);
}

function closeLightbox() {
    document.querySelector('.lightbox-overlay').classList.remove('active');
}

function showImage(index) {
    // Wrap around so previous/next navigation loops continuously.
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;

    currentIndex = index;

    const img = document.querySelector('.lightbox-image');
    // Remove the loaded class before swapping the source so the fade-in can replay.
    img.classList.remove('loaded');

    // Get the photo object at the requested index and construct the full image URL.
    const photo = photos[index];
    const src = `${BASE_URL}${photo.url}`;

    img.src = src;
    img.alt = photo.caption || 'gallery photo';

    // Handle image load errors gracefully by showing a fallback UI instead of a broken image.
    img.onerror = () => {
        console.error("Lightbox image failed:", img.src);

        img.classList.remove('loaded');
        img.src = ''; // prevent broken icon
        img.alt = "Image unavailable";
    };

    // Mark the image as loaded once the browser finishes fetching the new source.
    img.onload = () => img.classList.add('loaded');

    // Preload the next and previous images in the background for smoother navigation.
    const nextIndex = (currentIndex + 1) % photos.length;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;

    new Image().src = `${BASE_URL}${photos[nextIndex].url}`;
    new Image().src = `${BASE_URL}${photos[prevIndex].url}`;
}

// Enable keyboard shortcuts for lightbox navigation when it is open.
document.addEventListener('keydown', e => {
    const overlay = document.querySelector('.lightbox-overlay');
    // Only handle keys if the lightbox is visible.
    if (!overlay.classList.contains('active')) return;

    // Arrow keys navigate, Escape closes.
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'Escape') closeLightbox();
});