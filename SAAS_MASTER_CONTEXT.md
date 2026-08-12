# Corretora Val — Contexto Mestre do Projeto

> Documento vivo e fonte única de verdade. Toda decisão relevante de produto,
> arquitetura, operação ou experiência deve ser atualizada aqui.

## Produto

Site e plataforma administrativa próprios da Corretora Val, imobiliária familiar
de alto padrão, especializada em administração de patrimônios, venda, locação
anual e temporada em Balneário Camboriú e Camboriú.

O primeiro lançamento é **single-tenant** (Corretora Val), mas o modelo de dados
deve comportar uma futura expansão sem antecipar a complexidade de um SaaS.

## Padrão obrigatório de trabalho

1. Toda demanda deve ter uma GitHub Issue antes de implementação, classificada
   como `Correção`, `Melhoria` ou `Nova função`.
2. Cada mudança deve ser desenvolvida em uma branch vinculada à Issue e entregue
   por Pull Request. Não há commits diretos na branch principal.
3. Todo Pull Request deve conter:
   - referência à Issue (`Closes #<número>`);
   - resumo objetivo das alterações;
   - como a mudança foi validada;
   - riscos, limitações e próximos passos;
   - evidência visual quando alterar interface.
4. Deploys devem ocorrer somente a partir de Pull Requests aprovados e com a
   esteira de qualidade aprovada.
5. Agentes e desenvolvedores devem ler este documento antes de implementar.

## Esteira mínima de qualidade

Nenhuma alteração entra na branch principal sem, conforme aplicável:

- formatação, lint, verificação de tipos e detecção de código não utilizado;
- testes unitários e de integração;
- testes end-to-end para fluxos críticos com Playwright;
- revisão de segurança e dependências;
- verificação de orçamento de performance e acessibilidade;
- revisão visual de produto em telas desktop e mobile;
- cobertura enviada ao Codecov quando o repositório estiver conectado.

As ferramentas serão introduzidas progressivamente e de forma proporcional ao
MVP: Biome, Commitlint, Knip, Playwright, Codecov, Sentry e OpenTelemetry.
Stryker, Datadog, New Relic e Endtest só serão adotados quando houver uma
necessidade concreta, evitando custo e complexidade prematuros.

## Princípios de arquitetura

- Next.js e TypeScript para o site público e painel administrativo inicial.
- Separar domínio, interface e infraestrutura; uma API dedicada será extraída
  apenas quando os limites do produto justificarem isso.
- Componentizar desde o começo e reutilizar componentes existentes antes de
  criar novos.
- Aplicar DRY com critério; não introduzir abstrações especulativas.
- Proteger autenticação, autorização, limites de requisição e validação de
  entradas desde a primeira função administrativa.
- Termos de Uso e Política de Privacidade dependem de revisão e aprovação
  jurídica antes de publicação.

## Padrões de experiência

Toda interface deve ser refinada sob ótica de produto sênior e cumprir:

- carregamento tardio para recursos pesados e rotas não críticas;
- skeleton screens durante carregamentos perceptíveis;
- animações de entrada e saída suaves, breves e respeitando
  `prefers-reduced-motion`;
- progresso e bloqueio contra envio duplicado em ações assíncronas;
- feedback visual claro de sucesso, erro, estado vazio e ação em andamento;
- transições consistentes entre páginas, cards, modais e listas;
- foco em performance, acessibilidade e comportamento responsivo.

Os princípios de motion serão aplicados após a skill **Motion Principles** estar
instalada e disponível no ambiente. Nunca usar movimento apenas como decoração.

## Backlog inicial

| Tipo | Entrega |
| --- | --- |
| Nova função | Fundação do projeto, CI, padrões de qualidade e proteção da principal |
| Nova função | Design system e shell do site público responsivo |
| Nova função | Catálogo público de imóveis com busca e filtros |
| Nova função | Página individual de imóvel com SEO e contato via WhatsApp |
| Nova função | Área administrativa com autenticação e perfis |
| Nova função | CRUD de imóveis, características, status e imagens |
| Nova função | Formulários de contato e captação de proprietários com gestão de leads |
| Nova função | Páginas institucionais: Quem Somos, Administração, Locação e Temporada |
| Nova função | Blog administrável e SEO técnico |
| Melhoria | Observabilidade, performance budget e endurecimento de segurança |
| Nova função | Documentos legais revisados pelo jurídico |

## Identidade

- Posicionamento: imobiliária boutique, familiar, patrimonial, humana e regional.
- Tom: elegante, confiável, editorial e próximo; jamais genérico.
- Região: Balneário Camboriú e Camboriú.
- Fundação/trajetória: padronizar a referência histórica como **1990**.

