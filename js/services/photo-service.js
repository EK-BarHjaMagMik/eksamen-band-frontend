import { fetchJson } from "../api.js";

export function getPhotos(showId = null) {
    let url = '/api/photos';

    // Add optional filtering
    if (showId) {
        url += `?showId=${encodeURIComponent(showId)}`;
    }

    return fetchJson(url);
}
