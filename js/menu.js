// ===== MENU =====

const behindDoor    = document.getElementById('behind-door');
const easterEggBtn  = document.getElementById('easter-egg-btn');
const foolOverlay   = document.getElementById('fool-overlay');

let foolTimeout = null;

// Easter egg: "Fool of a Took"
easterEggBtn.addEventListener('click', () => {
    if (!foolOverlay.classList.contains('hidden')) return; // já visível

    foolOverlay.classList.remove('hidden', 'fading-out');

    clearTimeout(foolTimeout);
    foolTimeout = setTimeout(() => {
        foolOverlay.classList.add('fading-out');
        setTimeout(() => {
            foolOverlay.classList.add('hidden');
            foolOverlay.classList.remove('fading-out');
        }, 600);
    }, 4000);
});

// Função chamada pelo opening.js quando a porta abre
function triggerMenuEntrance() {
    behindDoor.classList.add('menu-visible');
}
