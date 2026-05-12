import { getPhotos } from '../services/photo-service.js';
import { renderPhotoGrid } from '../components/photoGrid.js';

export async function render(container, params) {
    const header = document.createElement('h1');
    header.classList.add('section-header');
    header.textContent = 'Photos';
    container.appendChild(header);

    const photos = await getPhotos();
    container.appendChild(renderPhotoGrid(photos));
}

export default { render };