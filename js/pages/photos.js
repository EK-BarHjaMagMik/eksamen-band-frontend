import { getPhotos } from '../services/photo-service.js';
import { renderPhotoGrid } from '../components/photo-grid.js';

export async function render(container, params) {
    const header = document.createElement('h1');
    header.classList.add('page-title');
    header.textContent = 'Photos';
    container.appendChild(header);

    const photos = await getPhotos();
    container.appendChild(renderPhotoGrid(photos));
}

export default { render };