// ===== CONFIGURAÇÕES DE TIMING (ms) =====
const TIMING = {
    runeGlowStart:  8000,   // início do brilho nas runas (junto com a frase)
    phraseDelay:    8000,   // frase começa a aparecer
    inputDelay:     14000,  // input aparece após a frase
    doorOpenDuration: 1800, // duração da animação da porta abrindo
    overlayFadeDelay: 1900, // fade-out do overlay após porta abrir
};

// Palavras válidas (case-insensitive)
const VALID_WORDS = ['amigo', 'mellon', 'friend'];

// ===== ELEMENTOS =====
const overlay        = document.getElementById('opening-overlay');
const doorContainer  = document.getElementById('door-container');
const phraseContainer = document.getElementById('phrase-container');
const inputContainer = document.getElementById('input-container');
const passwordInput  = document.getElementById('password-input');
const fakePlaceholder = document.getElementById('fake-placeholder');
const errorMessage   = document.getElementById('error-message');

// ===== SEQUÊNCIA DE ANIMAÇÃO =====
window.addEventListener('DOMContentLoaded', () => {

    // Ativa brilho das runas na imagem
    setTimeout(() => {
        doorContainer.classList.add('runes-glowing');
    }, TIMING.runeGlowStart);

    // Exibe a frase
    setTimeout(() => {
        phraseContainer.classList.add('visible');
    }, TIMING.phraseDelay);

    // Exibe o input e inicia ciclo do placeholder
    setTimeout(() => {
        inputContainer.classList.add('visible');
        passwordInput.focus();
        startPlaceholderCycle();
    }, TIMING.inputDelay);
});

// ===== PLACEHOLDER CICLANDO =====
const PLACEHOLDER_WORDS = ['amigo', 'friend', 'mellon'];
let placeholderIndex = 0;
let placeholderInterval = null;

function startPlaceholderCycle() {
    updatePlaceholder();
    placeholderInterval = setInterval(() => {
        if (passwordInput.value.length > 0) return; // não troca enquanto digita
        placeholderIndex = (placeholderIndex + 1) % PLACEHOLDER_WORDS.length;
        updatePlaceholder();
    }, 2000);
}

function updatePlaceholder() {
    const word = PLACEHOLDER_WORDS[placeholderIndex];
    fakePlaceholder.innerHTML = `<span class="placeholder-highlight">${word}</span>`;
    fakePlaceholder.style.animation = 'none';
    fakePlaceholder.offsetHeight; // reflow
    fakePlaceholder.style.animation = 'placeholderFade 0.4s ease';
}

// ===== INPUT: ocultar placeholder ao digitar =====
passwordInput.addEventListener('input', () => {
    fakePlaceholder.style.opacity = passwordInput.value.length > 0 ? '0' : '1';
    hideError();

    // Valida automaticamente assim que uma palavra válida é digitada
    const value = passwordInput.value.toLowerCase().trim();
    if (VALID_WORDS.includes(value)) {
        openDoor();
    }
});

// ===== INPUT: validar ao pressionar Enter =====
passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        validate();
    }
});

// ===== VALIDAÇÃO =====
function validate() {
    const value = passwordInput.value.toLowerCase().trim();

    if (VALID_WORDS.includes(value)) {
        openDoor();
    } else if (value.length > 0) {
        showError();
    }
}

// ===== ABRIR A PORTA =====
function openDoor() {
    passwordInput.disabled = true;
    inputContainer.style.transition = 'opacity 0.5s';
    inputContainer.style.opacity = '0';
    phraseContainer.style.transition = 'opacity 0.5s';
    phraseContainer.style.opacity = '0';

    // Ativa iluminação retangular (só ao abrir)
    overlay.classList.add('door-awakening');

    setTimeout(() => {
        doorContainer.classList.add('door-open');
    }, 600);

    // Inicia zoom do menu logo antes do overlay sumir
    setTimeout(() => {
        if (typeof triggerMenuEntrance === 'function') triggerMenuEntrance();
    }, TIMING.overlayFadeDelay + 200);

    // Fade-out do overlay revelando o menu por trás
    setTimeout(() => {
        overlay.classList.add('fade-out');
    }, TIMING.overlayFadeDelay + 600);

    setTimeout(() => {
        overlay.style.display = 'none';
    }, TIMING.overlayFadeDelay + 1800);
}

// ===== MOSTRAR ERRO =====
function showError() {
    errorMessage.classList.add('visible');

    // Efeito de tremida no input
    passwordInput.classList.add('input-error');
    passwordInput.value = '';
    fakePlaceholder.style.opacity = '1';

    setTimeout(() => {
        passwordInput.classList.remove('input-error');
    }, 500);
}

function hideError() {
    errorMessage.classList.remove('visible');
}
