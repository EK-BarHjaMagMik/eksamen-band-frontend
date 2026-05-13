import { fetchJson } from "../api.js";

export function getContactInfo() {
    return fetchJson('/api/contact');
}
