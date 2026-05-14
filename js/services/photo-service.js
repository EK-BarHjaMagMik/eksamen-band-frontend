import { fetchJson } from "../api.js";

export function getPhotos(showId = null) {
    let url = '/api/photos';

    // Add optional filtering
    if (showId) {
        url += `?showId=${encodeURIComponent(showId)}`;
    }

    return fetchJson(url);
}

export function getRecentPhotos(limit = 6) {
    const url = `/api/photos/recent?limit=${encodeURIComponent(limit)}`;
    return fetchJson(url);
}
