# Página 2 — Menu (Escolha das Opções)
endpoint - https://khazaddutz.github.io/wedding-site/menu/
arquivo - `menu/index.html`

## Descrição
Página revelada após a abertura das Portas de Durin. A imagem de Gandalf nas três portas de Moria preenche a tela com zoom suave de entrada. Três botões de navegação aparecem centralizados sobre a imagem.

## Layout
- Fullscreen, imagem cobre 100% da tela (`object-fit: cover`)
- Imagem inicia em `scale(0.92)` e vai para `scale(1.08)` ao entrar (zoom suave 2.5s)
- Botões empilhados verticalmente no centro da imagem, gap de 12px
- Largura dos botões: `min(72vw, 320px)`

## Elementos

### Imagem de Fundo
- Arquivo: `images/menu/3gatesgandalfwithtook.png`
- Gandalf com cajado aceso, três arcos ao fundo, Pippin no canto inferior direito
- Inicia `brightness(0.6)`, vai para `brightness(0.85)` com a entrada

### Botões de Navegação
Três botões empilhados, estilo igual à frase da Porta de Durin (Palatino, itálico, dourado):

| Botão | Destino |
|---|---|
| Convite | `/convite/` |
| Deixe sua Mensagem | `/mensagens/` |
| Lista de Presentes | `/presentes/` |

- Fundo semitransparente escuro, borda dourada sutil
- Hover: cor mais clara + glow dourado intenso
- Aparecem com fade-in após 1s de delay

### Easter Egg — Fool of a Took
- Botão invisível (`cursor: default`) posicionado sobre o Pippin e o poço (canto inferior direito)
- Ao clicar: overlay escuro com a frase:
  ```
  FOOL OF A TOOK
  throw yourself in next time
  and rid us of your stupidity
  ```
- "FOOL OF A TOOK" em laranja com efeito de chama pulsante
- Overlay some automaticamente após 6 segundos com fade-out

## Animações / Efeitos
- Entrada: zoom da imagem (`scale 0.92 → 1.08`) + fade-in dos botões com delay de 1s
- Hover nos botões: transição suave de cor e glow (0.3s)
- Easter egg: `foolAppear` (0.4s) → exibe 4s → `foolDisappear` (0.6s)

## Navegação
- Convite → `/convite/`
- Deixe sua Mensagem → `/mensagens/`
- Lista de Presentes → `/presentes/`
- Easter egg → overlay local (não navega)

## Estrutura de arquivos
- `menu/index.html` — HTML da página
- `css/menu.css` — estilos
- `js/menu.js` — easter egg + entrada da cena
- `images/menu/3gatesgandalfwithtook.png` — imagem de fundo

## Status
**Concluído.** Pendente de commit/push.

## Observações
- Roteamento sem `.html` via estrutura `pasta/index.html` — não usar libs de roteamento
- Easter egg não tem hint visual — completamente oculto
