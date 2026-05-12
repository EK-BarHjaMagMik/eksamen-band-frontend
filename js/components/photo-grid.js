import { BASE_URL } from '../api.js';

export function renderPhotoGrid(photos) {
    const grid = document.createElement('div');
    grid.classList.add('photo-grid');

    photos.forEach(photo => {
        const photoElement = document.createElement('img');
        photoElement.src = `${BASE_URL}${photo.url}`;
        photoElement.alt = photo.caption || 'gallery photo';
        grid.appendChild(photoElement);
    });

    return grid;
}