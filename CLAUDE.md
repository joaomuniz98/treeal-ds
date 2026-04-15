# Treeal DS — Instruções para o Claude

## Ao iniciar qualquer conversa neste projeto

1. Ler `C:\Users\crazy\Documents\Obsidian Vault\Treeal DS\Pendências.md`
2. Ler `C:\Users\crazy\Documents\Obsidian Vault\Treeal DS\Visão Geral.md`
3. Se o trabalho envolver um componente específico, ler também a nota correspondente em `Componentes/`

Isso garante contexto completo antes de qualquer implementação.

## Ao finalizar qualquer trabalho na sessão

Atualizar as notas do Obsidian que foram afetadas:
- `Pendências.md` — marcar o que foi feito, adicionar o que ficou pendente
- Nota do componente alterado — se props ou comportamento mudaram
- `Visão Geral.md` — se versão foi publicada ou stack mudou

## Vault do Obsidian

Path: `C:\Users\crazy\Documents\Obsidian Vault\Treeal DS\`

## Publicar o pacote

```bash
npm run build
npm version patch --no-git-tag-version
npm publish --access public --ignore-scripts
```

## Convenções

- CSS Modules — um arquivo por componente
- Componentes exportados via `components/index.ts`
- Tokens em `tokens/colors.ts` e `tokens/typography.ts`
- Nunca usar `'Clash Grotesk Variable'` — sempre `'Clash Grotesk'`
