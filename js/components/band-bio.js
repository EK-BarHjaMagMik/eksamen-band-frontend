export function renderBandBio(bio) {
    const section = document.createElement('section');
    section.className = 'band-bio';

    if (!bio?.content) return section;

    bio.content.split('\n\n').forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        section.appendChild(p);
    });

    return section;
}
