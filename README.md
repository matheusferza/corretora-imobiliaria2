# Corretora Val

Site público e plataforma administrativa da Corretora Val, especializada em
administração de patrimônios, venda, locação anual e temporada em Balneário
Camboriú e Camboriú.

## Desenvolvimento local

Requer Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Qualidade

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test:unit
npm run knip
npm run build
```

Para testes end-to-end, instale o navegador uma vez e execute:

```bash
npx playwright install chromium
npm run test:e2e
```

## Fluxo de contribuição

Leia [SAAS_MASTER_CONTEXT.md](./SAAS_MASTER_CONTEXT.md) antes de implementar.
Toda entrega começa em uma Issue e segue por Pull Request para a `main`.
