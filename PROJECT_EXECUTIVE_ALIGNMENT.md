# Alinhamento ao Projeto Executivo - Corretora Val

**Referência:** Projeto Executivo do Site Corretora Val, versão 1.0, agosto de
2026. Este documento traduz o escopo aprovado em entregas verificáveis no
repositório. Itens marcados como `Pendente` não devem ser apresentados como
entregues ao cliente.

## Diagnóstico em 13 de agosto de 2026

| Frente contratada | Estado atual | Situação |
| --- | --- | --- |
| Identidade premium, responsiva e WhatsApp acessível | Base visual lilás/dourado, Home responsiva e botão de WhatsApp | Parcial |
| Home com busca, destaques, serviços e chamadas | Home e serviços existem; busca e destaques administráveis não | Parcial |
| Comprar, locação anual e temporada | Há apenas uma rota de catálogo estático (`/imoveis`) | Pendente |
| Administração, Quem Somos, Autoridade, Memória Viva, Blog, Depoimentos e Contato | Links apontam para rotas ainda inexistentes | Pendente |
| Painel administrável de imóveis | Login e API básica existem; painel implementado e grava no banco; proteção por página e middleware aplicada. | Parcial (funcional) |
| Cadastro completo de imóvel e fotos | Schema contém somente dados básicos, foto e contrato | Pendente |
| Busca e filtros combinados | Não implementado | Pendente |
| Página individual, galeria, mapa e compartilhamento | Não implementado | Pendente |
| Formulários de captação e contato | Não implementado | Pendente |
| Blog, SEO técnico, sitemap e mensuração | Não implementado | Pendente |
| Hospedagem, SSL, backup e acessos da contratante | Não configurado no repositório | Pendente |
| Testes de qualidade | Formatação, lint, tipos, unitários, build e e2e básico passam | Parcial |

## Decisão de plataforma registrada

O documento executivo define **WordPress** com conta administrativa principal
sob controle da Corretora Val. Este produto foi iniciado em **Next.js + Prisma**.
São caminhos válidos tecnicamente, mas não equivalentes do ponto de vista de
contratação e autonomia operacional.

Em 13 de agosto de 2026, a Corretora Val aprovou formalmente a continuidade em
**Next.js + Prisma**, em substituição ao WordPress previsto no documento. Essa
decisão mantém os requisitos de autonomia: painel simples, acesso administrativo,
portabilidade/exportação de dados, backups, documentação e possibilidade de
troca de fornecedor. A aprovação final continua condicionada aos critérios de
aceite do projeto executivo.

## Rota recomendada se Next.js for aprovado

### Fase 0 - decisão e infraestrutura

- Registrar aprovação de tecnologia, escopo da primeira versão e responsáveis.
- Provisionar PostgreSQL, configurar `DATABASE_URL`, executar migration e seed.
- Definir provedor, domínio, SSL, backup e e-mails profissionais em contas da
  Corretora Val.
- Gerar `NEXTAUTH_SECRET` em gerenciador seguro; não versionar `.env`.

**Saída:** ambiente administrável e reproduzível, com acesso da contratante.

### Fase 1 - núcleo do painel de imóveis

- Ampliar o modelo: código, tipo, finalidade, status, cidade, bairro, endereço
  aproximado, preços e taxas, características, marcadores e dados de temporada.
- Implementar área administrativa com criar, editar, duplicar, arquivar,
  excluir, alterar status/preço e selecionar destaque.
- Implementar upload, foto principal, ordenação de galeria e proteção de
  documentos internos, se aprovada.

**Aceite da fase:** uma pessoa da Corretora Val cadastra e atualiza um imóvel
completo sem ajuda técnica.

### Fase 2 - experiência pública de imóveis

- Criar catálogos de Comprar, Locação Anual e Temporada.
- Implementar filtros por cidade, bairro, preço, dormitórios, suítes, vagas,
  finalidade e diferenciais.
- Criar página individual com galeria otimizada, código, WhatsApp preenchido,
  copiar link, mapa aproximado, disponibilidade de temporada e SEO por imóvel.

**Aceite da fase:** visitante encontra e compartilha um imóvel em celular e
desktop, e o contato informa o código do imóvel.

### Fase 3 - conteúdo, captação e autoridade

- Publicar Administração, Quem Somos, Autoridade, Memória Viva, Contato e
  demais páginas contratadas.
- Implementar os quatro formulários: anunciar, alugar, comprar e falar com a
  Corretora Val; registrar leads caso confirmado no escopo.
- Criar blog, depoimentos mediante autorização, sitemap, metadados e integrações
  de Analytics, Search Console, Maps e Google Business Profile.

### Fase 4 - lançamento e aceite

- Validar WhatsApp, formulários, permissões, ortografia, SEO, responsividade,
  desempenho e backup/restauração.
- Entregar treinamento ou manual do painel, inventário de acessos e arquivos
  organizados.
- Realizar a aprovação final da Corretora Val e acompanhar os primeiros 90 dias.

## Fora da primeira entrega

Meu Patrimônio, ValIA, Academia Corretora Val, Trabalhe Conosco, Parceiros,
novos idiomas, CRM completo, assinatura eletrônica e tour virtual permanecem
como evolução. Não devem atrasar o núcleo contratado.

## Próxima ação

Executar a Fase 1: provisionar o PostgreSQL sob controle da Corretora Val,
aplicar a migration inicial e entregar o painel de cadastro e atualização de
imóveis.
