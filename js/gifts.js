// =====================================================
//  URL do QR Code — substituir pelo link real
// =====================================================
const QRCODE_URL = 'COLE_AQUI_A_URL_DO_QRCODE';
// =====================================================

const grid = document.getElementById('gifts-grid');

// IntersectionObserver: injeta o iframe quando o card entra no viewport.
// Uma vez carregado, o card permanece na memória (não desrenderiza ao sair).
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const gifDiv = entry.target;
        const id    = gifDiv.dataset.tenorId;
        const ratio = gifDiv.dataset.aspectRatio;

        const iframe = document.createElement('iframe');
        iframe.src             = `https://tenor.com/embed/${id}`;
        iframe.allowFullscreen = true;
        iframe.style.aspectRatio = ratio;

        gifDiv.appendChild(iframe);
        observer.unobserve(gifDiv);
    });
}, {
    rootMargin: '120px', // começa a carregar 120px antes de entrar na tela
});

async function init() {
    let gifts;
    try {
        const res = await fetch('../../gifs/gifs.json');
        gifts = await res.json();
    } catch (err) {
        console.error('Erro ao carregar lista de presentes:', err);
        return;
    }

    gifts.forEach(gift => {
        // Card (link para o QR Code)
        const card = document.createElement('a');
        card.className = 'gift-card';
        card.href      = QRCODE_URL;
        card.target    = '_blank';
        card.rel       = 'noopener noreferrer';

        // Título
        const title = document.createElement('p');
        title.className   = 'gift-title';
        title.textContent = gift.title;

        // Placeholder do GIF — iframe injetado ao entrar no viewport
        const gifDiv = document.createElement('div');
        gifDiv.className            = 'gift-gif';
        gifDiv.dataset.tenorId      = gift.tenor_id;
        gifDiv.dataset.aspectRatio  = gift.aspect_ratio;

        card.appendChild(title);
        card.appendChild(gifDiv);
        grid.appendChild(card);

        observer.observe(gifDiv);
    });
}

init();
