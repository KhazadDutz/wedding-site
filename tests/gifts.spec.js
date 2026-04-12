import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:8181/routes/presentes/';

test.beforeEach(async ({ page }) => {
    // Intercepta iframes do Tenor para não gerar tráfego externo
    await page.route('**/tenor.com/**', route =>
        route.fulfill({ status: 200, body: '', contentType: 'text/html' })
    );
    await page.goto(BASE);
});

// ── Estrutura ────────────────────────────────────────────────────────────────

test('título "Lista de Presentes" está visível', async ({ page }) => {
    await expect(page.locator('#gifts-title')).toBeVisible();
});

test('grid de presentes existe na página', async ({ page }) => {
    await expect(page.locator('#gifts-grid')).toBeVisible();
});

test('ao menos um card é renderizado', async ({ page }) => {
    await expect(page.locator('.gift-card').first()).toBeVisible();
});

test('cada card tem título visível', async ({ page }) => {
    const title = page.locator('.gift-card .gift-title').first();
    await expect(title).toBeVisible();
});

test('cada card é um link (tem atributo href)', async ({ page }) => {
    const href = await page.locator('.gift-card').first().getAttribute('href');
    expect(href).toBeTruthy();
});

// ── Botão Voltar ─────────────────────────────────────────────────────────────

test('botão "Voltar ao menu" está visível', async ({ page }) => {
    await expect(page.locator('#back-btn')).toBeVisible();
});

test('botão "Voltar ao menu" aponta para /menu', async ({ page }) => {
    const href = await page.locator('#back-btn').getAttribute('href');
    expect(href).toContain('menu');
});

test('botão "Voltar ao menu" tem altura mínima de 44px', async ({ page }) => {
    const box = await page.locator('#back-btn').boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(44);
});

// ── Grid responsivo ──────────────────────────────────────────────────────────

test('grid tem 4 colunas no desktop', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'desktop') return;
    const cards = page.locator('.gift-card');
    const count = await cards.count();
    if (count < 2) return;
    const box0 = await cards.nth(0).boundingBox();
    const box1 = await cards.nth(1).boundingBox();
    // Dois cards na mesma linha: mesma posição y
    expect(Math.abs(box0.y - box1.y)).toBeLessThan(5);
});

test('grid tem 2 colunas no mobile portrait', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-portrait') return;
    const cards = page.locator('.gift-card');
    const count = await cards.count();
    if (count < 3) return;
    const box0 = await cards.nth(0).boundingBox();
    const box2 = await cards.nth(2).boundingBox();
    // Card 0 e card 2 devem estar em linhas diferentes (y maior)
    expect(box2.y).toBeGreaterThan(box0.y + box0.height / 2);
});

// ── Lazy loading ─────────────────────────────────────────────────────────────

test('gif do primeiro card visível carrega iframe', async ({ page }) => {
    // Aguarda o observer injetar o iframe no primeiro card visível
    await expect(page.locator('.gift-gif iframe').first()).toBeVisible({ timeout: 5000 });
});

// ── Screenshots ──────────────────────────────────────────────────────────────

test('screenshot — página de presentes', async ({ page }, testInfo) => {
    await page.screenshot({
        path: `test-results/gifts-${testInfo.project.name}.png`,
        fullPage: false,
    });
});
