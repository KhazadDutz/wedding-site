// =====================================================
//  CONFIGURAÇÃO — Atualize com a URL do Apps Script
// =====================================================
//
//  Como configurar:
//  1. No Google Apps Script, crie um novo projeto com:
//
//     function doGet(e) {
//       var sheet = SpreadsheetApp
//         .getActiveSpreadsheet()
//         .getActiveSheet();
//       var name = e.parameter.name || '';
//       if (name) sheet.appendRow([new Date(), name]);
//       return ContentService
//         .createTextOutput(JSON.stringify({ status: 'ok' }))
//         .setMimeType(ContentService.MimeType.JSON);
//     }
//
//  2. Publique como Web App:
//     Implantações → Nova implantação → Tipo: App da Web
//     → Executar como: Eu mesmo → Quem tem acesso: Qualquer pessoa
//
//  3. Cole a URL gerada abaixo.
//
const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxrHhI9VoRp3UHMUio6Ik2DNSAJSuBPxL7q63ByjTJNNc306RUDR515Mild4fXkI5j-uw/exec';

// Endpoint da aba Churrasco (Planilha: 1AlGtHwRDCyuvT_qgXBTiMf58_e4phxg-zTyZvUXGOpk)
// Após implantar o Apps Script abaixo, cole a URL aqui:
const CHURRASCO_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzqzQIuzbJtr0J0fQMnk1pI5fqLbmj2dUhMPN7kABUftAryYBvR2C7gfvoy-xMzskRK/exec';
// =====================================================

const overlay      = document.getElementById('rsvp-overlay');
const rsvpBtn      = document.getElementById('rsvp-btn');
const nameInput    = document.getElementById('name-input');
const confirmBtn   = document.getElementById('confirm-btn');
const confirmedMsg = document.getElementById('confirmed-msg');

// ── Abrir modal ──────────────────────────────────────
rsvpBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    // Não faz focus automático em touch para não abrir teclado sem gesto do usuário
    if (!('ontouchstart' in window)) {
        nameInput.focus();
    }
});

// ── Fechar ao clicar no backdrop (fora do modal) ─────
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

// ── Enter no input dispara confirmação ───────────────
nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirmBtn.click();
});

// ── Confirmar presença ────────────────────────────────
confirmBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name) {
        nameInput.focus();
        return;
    }

    confirmBtn.disabled = true;

    // Envia nome para o Google Sheets via Apps Script
    // Usa no-cors: o servidor recebe a requisição mas a resposta é opaca.
    // A confirmação é exibida de forma otimista após o envio.
    try {
        const url = `${CHURRASCO_ENDPOINT}?name=${encodeURIComponent(name)}`;
        await fetch(url, { method: 'GET', mode: 'no-cors' });
    } catch (_) {
        // Ignora erros de rede — no-cors retorna resposta opaca sem lançar
    }

    // Oculta input e botão, exibe mensagem de confirmação
    nameInput.style.display = 'none';
    confirmBtn.style.display = 'none';
    confirmedMsg.classList.remove('hidden');

    // Fecha modal automaticamente após 2.5s
    setTimeout(closeModal, 2500);
});

// ── Resetar e fechar modal ────────────────────────────
function closeModal() {
    overlay.classList.add('hidden');
    nameInput.value       = '';
    nameInput.style.display    = '';
    confirmBtn.disabled        = false;
    confirmBtn.style.display   = '';
    confirmedMsg.classList.add('hidden');
}
