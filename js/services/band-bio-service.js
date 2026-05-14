import { fetchJson } from "../api.js";

export function getBandBio() {
    return fetchJson('/api/band-bio');
}
