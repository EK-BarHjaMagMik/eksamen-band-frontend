import { renderHero } from '../components/hero.js';

export function render(container, params) {
    container.appendChild(renderHero());
}

export default { render };