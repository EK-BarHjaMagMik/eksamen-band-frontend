import { BASE_URL } from '../api.js';

export function renderPhotoGrid(photos) {
    const grid = document.createElement('div');
    grid.classList.add('photo-grid');

    photos.forEach(photo => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('photo-grid-item');

        const img = document.createElement('img');
        img.src = `${BASE_URL}${photo.url}`;
        img.alt = photo.caption || 'gallery photo';

        wrapper.appendChild(img);
        grid.appendChild(wrapper);
    });

    return grid;
}
