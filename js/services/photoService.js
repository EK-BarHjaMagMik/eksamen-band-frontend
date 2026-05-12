import { fetchJson } from "../api.js";

export function getPhotos() {
    return fetchJson('/api/photos');
}