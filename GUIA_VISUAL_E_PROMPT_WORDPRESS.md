# Guia visual da Corretora Val e prompt para WordPress

Este documento descreve a linguagem visual, o layout, os componentes, o conteúdo e os comportamentos do site atual da Corretora Val. Foi elaborado a partir da implementação existente no projeto. Use-o como especificação de referência para reconstruir o site em PHP/WordPress com aparência equivalente.

## 1. Direção visual

A identidade combina três ideias:

- **Confiança e patrimônio:** roxo ameixa profundo, superfícies claras, bordas discretas e informações organizadas.
- **Acolhimento e legado:** dourado suave, ícones lineares, cantos arredondados e textos sobre família, cuidado e história.
- **Editorial premium:** títulos grandes em serifada elegante, muito espaço em branco e composição assimétrica controlada.

O resultado deve parecer uma imobiliária local experiente, humana e sofisticada. Não é um portal imobiliário genérico, nem uma landing page agressiva de vendas. A interface precisa transmitir proximidade, credibilidade, organização e permanência.

### O que evitar

- Fundo branco puro em todas as seções.
- Roxo neon, azul corporativo, gradientes roxos exagerados ou estética de SaaS.
- Fontes genéricas como Arial, Roboto ou Inter.
- Hero com excesso de elementos, carrossel automático ou fotografia escura sem função.
- Cards dentro de cards, sombras pesadas, bordas muito marcadas ou excesso de efeitos.
- Textos em caixa alta para títulos longos.
- Layout com tudo centralizado e sem hierarquia.
- Botões retangulares grandes com cantos quadrados.
- Ícones desenhados manualmente quando houver equivalente em Lucide ou outra biblioteca linear.

## 2. Paleta de cores

Use variáveis globais. Não espalhe valores de cor pelo tema.

| Token             | HEX / valor                     | Uso                                                                           |
| ----------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `--background`    | `#F8F5EF`                       | Fundo principal marfim quente.                                                |
| `--surface`       | `#FFFFFF`                       | Cards, formulários, menu móvel e áreas de leitura.                            |
| `--surface-muted` | `#F1EBE1`                       | Faixas alternadas, badges e fundos secundários.                               |
| `--ink`           | `#242126`                       | Texto principal e labels.                                                     |
| `--ink-soft`      | `#6F6870`                       | Parágrafos auxiliares, metadados e descrições.                                |
| `--plum`          | `#35104F`                       | Cor primária da marca, títulos, header CTA e footer.                          |
| `--plum-bright`   | `#4A1768`                       | Hover da cor primária e variação de gradiente.                                |
| `--gold`          | `#B58A3A`                       | Eyebrows, ícones, números, links de destaque e CTA principal em fundo escuro. |
| `--gold-light`    | `#D8BD82`                       | Bordas douradas, detalhes sobre roxo e estados suaves.                        |
| `--line`          | `rgba(53, 16, 79, 0.14)`        | Bordas padrão e separadores.                                                  |
| Sucesso           | `#ECFDF5`, `#047857`, `#059669` | Mensagem positiva dos formulários.                                            |
| Erro              | `#FEF2F2`, `#B91C1C`, `#EF4444` | Mensagem de erro dos formulários.                                             |

### Uso da cor

- O marfim deve ocupar o fundo geral.
- O branco deve aparecer em blocos de conteúdo, cards e formulários.
- O roxo é reservado para marca, títulos, botões primários, rodapé e painéis de confiança.
- O dourado é um acento, não uma cor de preenchimento dominante.
- Texto branco sobre roxo deve usar opacidade aproximada de 70% a 80% para textos secundários.
- Use gradientes somente em painéis institucionais: roxo escuro para roxo mais claro ou marfim para branco.

## 3. Tipografia

### Família principal: Manrope

Use **Manrope** para todo texto de interface e corpo:

- Navegação: 10 a 11 px, peso 800, tracking de aproximadamente `0.06em`, caixa alta.
- Eyebrow: 11 a 12 px, peso 800, tracking de `0.14em` a `0.16em`, caixa alta, dourado.
- Corpo normal: 14 a 16 px, peso 400 a 500, line-height de 1.6 a 2.
- Texto auxiliar: 12 a 14 px, peso 400 a 700.
- Botões: 11 a 14 px, peso 800; CTAs principais podem usar caixa alta e tracking de `0.06em` a `0.1em`.

### Família de destaque: Cormorant Garamond

Use **Cormorant Garamond** para títulos, slogan, marca textual e números institucionais:

- H1 da home: 56 px no desktop grande, até 80 px em telas largas; line-height entre `0.90` e `1.05`.
- H1 interno: 36 px no mobile, 48 px em tablet, 60 px no desktop.
- H2: 36 a 56 px, line-height próximo de 1.
- H3: 24 a 36 px.
- Marca “Val”: cerca de 32 px no header e 40 px no footer.
- Números de estatísticas: 36 a 48 px.
- Use itálico apenas para destacar palavras-chave, como “abre”.

A serifada deve ser elegante, leve e editorial. Não substitua por Times New Roman. Se o host não permitir Google Fonts, hospede os arquivos WOFF2 localmente. Fallbacks aceitáveis: `Georgia, serif` para títulos e `Arial, sans-serif` apenas como fallback técnico para a interface.

### Regras tipográficas

- Títulos sempre em roxo, salvo títulos dentro de painéis roxos, que ficam brancos.
- Não use letter-spacing negativo fora dos títulos display.
- Parágrafos devem ter largura limitada, normalmente entre 560 e 680 px.
- Textos longos devem usar line-height confortável e nunca ficar em colunas muito estreitas.
- O contraste entre Cormorant e Manrope é parte essencial da identidade.

## 4. Grid, container e espaçamento

- Container central: largura máxima de **1280 px**.
- Padding horizontal: **24 px** no mobile; **48 px** a partir de 768 px.
- Header: altura mínima de **80 px**.
- Largura de leitura para textos: 640 a 720 px.
- Grid principal da home no desktop: duas colunas, aproximadamente `1fr 0.92fr`.
- Gaps comuns: 12, 16, 24, 32, 48 e 80 px.
- Seções: padding vertical de 64 px no mobile e 96 px no desktop.
- Bordas: 1 px, usando `rgba(53, 16, 79, 0.14)`.
- Raio de cards: 16 px ou 24 px; painéis institucionais especiais podem usar 32 px.
- Botões: totalmente arredondados, com altura mínima de 48 px.
- Inputs: raio de 12 px, padding horizontal de 16 px e vertical de 12 a 16 px.

### Breakpoints

- Até 639 px: uma coluna, menu móvel, botões empilhados.
- 640 a 767 px: duas colunas em grids pequenos quando houver espaço.
- A partir de 768 px: padding lateral de 48 px e formulários com duas colunas.
- A partir de 1024 px: grids institucionais maiores e composição em 12 colunas.
- A partir de 1280 px: navegação completa no header.

A regra prioritária é preservar a hierarquia e o respiro. Em telas pequenas, empilhe os blocos sem reduzir a legibilidade nem criar overflow horizontal.

## 5. Header e navegação

O header é fixo no topo durante a rolagem:

- Fundo marfim com aproximadamente 95% de opacidade.
- `backdrop-filter: blur(...)` discreto.
- Borda inferior sutil e sombra mínima.
- Container com alinhamento horizontal, altura mínima de 80 px.
- Logo à esquerda: círculo de 36 px com borda dourada, ícone de coração linear roxo e texto “Val” em Cormorant. Abaixo de “Val”, o nome da marca em Manrope minúscula visual, caixa alta, aproximadamente 8 px.
- Navegação desktop alinhada à direita do logo, com links compactos em caixa alta.
- Link “Imóveis” aparece antes das páginas institucionais.
- CTA “WhatsApp” em pílula roxa com ícone de mensagem.
- Navegação completa somente em telas largas, a partir de 1280 px.
- Em telas menores, substituir os links por botão circular de menu de 44 px.
- Menu móvel: painel branco de aproximadamente 288 px, canto de 16 px, sombra ampla e links com área de toque confortável.
- Estados de foco devem ter contorno dourado visível.

Navegação pública:

1. Imóveis
2. Administração
3. Quem Somos
4. Autoridade
5. Memória Viva
6. Blog
7. Contato

## 6. Rodapé

O rodapé é uma faixa sólida em roxo ameixa:

- Texto branco; conteúdo secundário com opacidade de 70% a 75%.
- Grid de três colunas no desktop: marca/tagline, navegação e atendimento.
- Padding vertical de aproximadamente 56 px.
- Marca repetida com coração, “Val” em Cormorant e detalhe dourado.
- Eyebrows “Navegação” e “Atendimento” em dourado claro.
- Atendimento pode exibir telefone, e-mail, endereço e link para Instagram, sempre com ícones lineares.
- Base inferior separada por borda branca de baixa opacidade.
- Copyright e CRECI em texto pequeno e pouco contrastado.
- No mobile, as três colunas viram uma coluna com gap vertical.

## 7. Home page

A home começa diretamente com a experiência, sem uma barra de anúncio ou hero de marketing genérico.

### Hero principal

- Container com grid de duas colunas no desktop.
- Altura mínima aproximada: `calc(100vh - 80px)`.
- Padding vertical de 64 a 80 px.
- Coluna esquerda: eyebrow de localização “Balneário Camboriú e Camboriú”, H1 grande e texto institucional.
- H1: “Confiança que abre portas.”, com “abre” em itálico e dourado.
- Dois CTAs: “Conheça nossos imóveis” em roxo preenchido e “Administrar meu imóvel” em branco com borda.
- Coluna direita: painel roxo em gradiente, canto de 32 px, padding de 32 a 48 px e sombra profunda porém suave.
- No painel: eyebrow “Desde 1990”, frase editorial “Mais que imóveis, cuidamos de histórias.”, separador e texto de apoio.
- Pequeno card sobreposto no canto inferior direito em branco, borda dourada e frase “Cada chave, um novo começo.”.
- No mobile, o painel vem abaixo do texto e o card sobreposto pode desaparecer para evitar compressão.

### Seção de serviços

- Faixa branca com bordas superior e inferior.
- Eyebrow “Uma relação de confiança”.
- Título grande: “Tudo o que seu imóvel precisa, com o cuidado que você espera.”.
- Três cards em desktop; uma coluna no mobile.
- Card com fundo marfim, padding de 28 px, raio de 16 px e sombra quase imperceptível.
- Ícone em círculo roxo com traço dourado.
- Título em Cormorant de aproximadamente 30 px.
- Hover: elevação de 4 px e sombra um pouco maior.
- Serviços: Administração patrimonial; Locação e temporada; Compra e venda.

## 8. Hero interno e seções institucionais

O componente de hero interno é uma faixa clara com gradiente vertical de marfim para branco:

- Borda inferior.
- Padding vertical de 64 px no mobile e 96 px no desktop.
- Pequeno badge dourado em pílula com borda dourada e fundo branco.
- H1 em Cormorant, roxo, entre 36 e 60 px.
- Subtítulo em Manrope, cinza suave, largura máxima aproximada de 640 px.
- Um brilho radial roxo quase imperceptível pode existir no fundo, sem virar decoração dominante.

### Quem Somos

Página narrativa e humana, com bastante texto e blocos de autoridade:

- Hero: “Minha História. Meu Compromisso.” e subtítulo sobre a trajetória desde 1990.
- Biografia em grid de 12 colunas: texto ocupando 7 colunas e cartão de perfil ocupando 5.
- Cartão de perfil com gradiente marfim/branco, borda dourada, raio de 32 px e padding amplo.
- Seções alternadas entre branco e `surface-muted`, separadas por bordas horizontais.
- Missão e visão em dois cards brancos, com ícones roxos e acentos dourados.
- Valores em grid de três colunas, cards brancos de raio 16 px e ícones que mudam de fundo marfim para roxo no hover.
- Bloco de família com painel roxo de um lado e narrativa do outro.
- Manifesto final em painel roxo com borda dourada, citação, ícone de aspas e título claro.

### Memória Viva / trajetória

- Seção centralizada com largura de leitura limitada.
- Timeline vertical com linha dourada de 2 px.
- Cada marco é um card branco com raio 16 px, borda e sombra mínima.
- Bolhas circulares com ícone linear ficam sobre a linha; no hover passam de branco/roxo para roxo/dourado.
- Ano em Cormorant dourado, tag em pílula marfim e local com ícone de mapa.
- Marcos principais: 1990, 25 anos, 2019 e Hoje.

### Autoridade

- Cards de estatísticas em grid de quatro colunas no desktop e duas no mobile.
- Números grandes em Cormorant roxo.
- Labels compactas em caixa alta e tracking amplo.
- Painel de credibilidade com gradiente de branco para marfim e borda dourada.
- Layout interno em duas colunas: argumento editorial de um lado e lista de verificações do outro.
- Lista de confiança em card branco interno, com ícones de check dourados.
- Informações importantes: 35+ anos no mercado, vistorias detalhadas, atuação em Balneário Camboriú e Camboriú, CRECI/SC 56372-F.

## 9. Imóveis

A listagem deve ser simples, limpa e orientada à consulta:

- Container com padding vertical de 48 px.
- Título “Imóveis” em Cormorant, roxo, cerca de 36 px.
- Subtítulo curto em cinza suave.
- Grid com gap de 24 px: uma coluna no mobile, duas a partir de 640 px, três a partir de 1024 px.
- Card de imóvel: fundo marfim, borda, raio de 16 px, padding de 16 px e sombra leve.
- Área de imagem com altura aproximada de 144 px e raio de 6 px; usar fotografia real do imóvel no WordPress, com `object-fit: cover`.
- Título em Manrope bold roxo, cidade em texto auxiliar e preço em peso 800.
- Botão “Ver detalhes” em pílula roxa.
- Estado vazio com mensagem curta e orientação para contato.
- Nunca deformar fotos nem alterar a altura do grid quando uma imagem falhar; usar placeholder marfim/roxo.

## 10. Blog

O blog segue uma leitura editorial compacta:

- Cards brancos com borda e raio de 16 px.
- Padding interno de 24 px no mobile e 32 px em telas maiores.
- Badge de categoria em pílula marfim, texto roxo e caixa alta.
- Data com ícone de relógio dourado.
- Título em Cormorant, roxo, com hover em roxo claro.
- Resumo em Manrope cinza, limitado a aproximadamente três linhas.
- Rodapé do card com borda superior: autor à esquerda e “Ler artigo” com seta para cima à direita.
- Hover: borda dourada suave, sombra moderada e mudança de cor nos links.
- Página de artigo deve manter coluna de leitura confortável, metadados discretos e hierarquia editorial.

## 11. Formulários e contato

Formulários devem parecer parte do mesmo sistema, não um plugin incorporado:

- Painel branco, borda, raio de 24 a 32 px, padding de 32 px no mobile e 48 px em desktop.
- Título em Cormorant, roxo, 24 a 32 px.
- Texto auxiliar em Manrope 14 px, cinza.
- Labels em 11 a 12 px, peso 700, caixa alta.
- Inputs e selects brancos/marfim, borda sutil, raio de 12 px, altura aproximada de 46 a 52 px.
- Focus: borda dourada e outline discreto; nunca remover a indicação de foco sem substituí-la.
- Grid de duas colunas para nome/telefone e outros campos curtos a partir de 640 px.
- Textarea com altura de 96 a 128 px.
- Botão de envio full-width, roxo, pílula, texto branco em caixa alta e ícone de envio.
- Estado loading: ícone girando e texto “Enviando...”, botão desabilitado com opacidade reduzida.
- Estado sucesso: caixa verde muito clara, borda verde clara, ícone de check e instrução para enviar outra mensagem.
- Estado erro: caixa vermelha muito clara com ícone de alerta e mensagem legível.
- Campos de contato: nome, e-mail, telefone/WhatsApp, assunto e mensagem.
- Campos para proprietário: nome, telefone, e-mail, tipo do imóvel, bairro/cidade e observações.

## 12. CTA final e WhatsApp

### CTA de conversão

- Faixa full-width em roxo ameixa, padding de 64 a 96 px.
- Conteúdo centralizado, H2 branco em Cormorant de 32 a 56 px.
- Descrição branca com 80% de opacidade.
- Botão principal dourado com texto roxo e ícone do WhatsApp.
- Botão secundário transparente, borda branca de baixa opacidade e seta.
- Pode haver um brilho circular dourado muito sutil no canto, sempre subordinado ao conteúdo.

### Botão flutuante

- Fixo no canto inferior direito, 20 px de distância em desktop e mobile.
- Círculo de 56 px, fundo roxo, ícone de mensagem branco, sombra profunda.
- Hover: sobe 4 px e fica roxo mais claro.
- Deve ter `aria-label` descritivo e não cobrir campos ou botões em telas pequenas.

## 13. Motion e estados

A animação é discreta e funcional:

- Entrada de elementos: fade-up de aproximadamente 520 ms, começando com opacidade 0, blur de 4 px e deslocamento vertical de 10 px.
- Delays curtos, por exemplo 100 ms entre eyebrow, título e texto do hero.
- Hover de botões e cards: 180 ms, com pequena elevação ou mudança de cor.
- Clique: escala de aproximadamente 0.97.
- Respeitar `prefers-reduced-motion: reduce`, removendo animações e transições quando solicitado pelo usuário.
- Não usar parallax, carrosséis automáticos ou animações permanentes que distraiam.

## 14. Ícones e imagens

- Usar ícones lineares consistentes, preferencialmente Lucide Icons ou equivalente disponível no WordPress.
- Espessura visual próxima de 1.7 a 2 px.
- Ícones devem acompanhar texto e nunca substituir labels essenciais.
- Ícones recorrentes: coração, mensagem/WhatsApp, menu, seta, prédio, chave, escudo, mapa, câmera, e-mail, relógio, usuário, check, envio, aspas, missão e bússola.
- Para imóveis, usar fotografias reais, claras e bem enquadradas.
- Manter `object-fit: cover`, proporção estável e lazy loading.
- Não usar imagem escura, borrada, genérica ou apenas atmosférica quando o usuário precisa conhecer o imóvel.
- O hero atual usa principalmente composição tipográfica e painel em gradiente; não inventar um carrossel fotográfico para a home.

## 15. Arquitetura sugerida no WordPress

Implementar como tema ou child theme com componentes reutilizáveis e campos editáveis:

- Header global e menu responsivo.
- Footer global.
- Variáveis CSS no `:root`.
- Classes utilitárias ou blocos para `shell`, `display`, `eyebrow`, `interactive`, `page-hero`, `section-title` e `cta-section`.
- Custom Post Type `imovel` para imóveis.
- Custom Post Type `post`/blog para artigos.
- Campos de imóvel: título, tipo, cidade, bairro, preço de venda, aluguel mensal, diária, fotos, quartos, banheiros, vagas, descrição e destaque.
- Campos globais: nome da marca, tagline, telefone, WhatsApp, e-mail, endereço, Instagram e CRECI.
- Páginas editáveis: Administração, Quem Somos, Autoridade, Memória Viva e Contato.
- Formulários com validação server-side, nonce/CSRF, sanitização e feedback visual sem recarregar desnecessariamente a página.
- Menu móvel acessível por teclado e com áreas de toque mínimas de 44 px.
- Imagens e fontes devem ter fallback, lazy loading e dimensões estáveis para evitar deslocamento de layout.

## 16. Prompt pronto para gerar o site WordPress

Copie o bloco abaixo para o gerador ou use-o como briefing técnico do desenvolvimento:

```text
Crie um site WordPress/PHP completo para uma imobiliária brasileira chamada Corretora Val, com aparência premium, humana, institucional e editorial. O resultado deve reproduzir uma identidade baseada em confiança, patrimônio, família e atendimento próximo em Balneário Camboriú e Camboriú.

DIREÇÃO VISUAL
Use fundo marfim quente, superfícies brancas, roxo ameixa profundo e detalhes dourados suaves. A paleta obrigatória é: fundo #F8F5EF, branco #FFFFFF, fundo secundário #F1EBE1, texto #242126, texto auxiliar #6F6870, roxo principal #35104F, roxo hover #4A1768, dourado #B58A3A, dourado claro #D8BD82 e bordas rgba(53,16,79,0.14). O dourado é apenas um acento. Não use azul corporativo, neon, excesso de roxo, fundo preto ou estética genérica de SaaS.

TIPOGRAFIA
Use Manrope para navegação, parágrafos, labels e botões. Use Cormorant Garamond para todos os títulos, a marca “Val”, slogans e números de destaque. O contraste entre uma sans-serif geométrica e uma serifada editorial é obrigatório. H1 da home entre 56 e 80 px no desktop, H1 interno entre 36 e 60 px, H2 entre 36 e 56 px, corpo entre 14 e 16 px com line-height confortável. Use Georgia como fallback de título e Arial apenas como fallback técnico.

LAYOUT GLOBAL
Use container central com largura máxima de 1280 px, padding horizontal de 24 px no mobile e 48 px a partir de 768 px. Use bastante espaço vertical: 64 px no mobile e 96 px no desktop. Use grids de uma coluna no mobile, duas colunas em telas médias e três ou quatro colunas no desktop quando o conteúdo justificar. Use bordas de 1 px, sombras muito suaves, cards com raio de 16 a 24 px e painéis especiais com raio de até 32 px. Preserve a responsividade sem overflow horizontal.

HEADER
Crie header sticky de 80 px, com fundo marfim translúcido, blur discreto, borda inferior e sombra mínima. À esquerda, logo com círculo dourado, ícone de coração linear roxo, “Val” em Cormorant e o nome da marca pequeno abaixo. No desktop largo, exiba links Imóveis, Administração, Quem Somos, Autoridade, Memória Viva, Blog e Contato. À direita, botão WhatsApp em pílula roxa com ícone. Abaixo de 1280 px, substitua os links por botão circular de menu de 44 px e painel móvel branco com links grandes, raio de 16 px e sombra ampla. Todos os estados de foco devem ter contorno dourado.

HOME
A home deve começar diretamente pela experiência, sem barra de anúncio. Faça hero em duas colunas no desktop e uma coluna no mobile, com altura mínima aproximada de calc(100vh - 80px). À esquerda, eyebrow “Balneário Camboriú e Camboriú”, H1 “Confiança que abre portas.” em Cormorant, destacando “abre” em itálico dourado, texto institucional e dois botões: “Conheça nossos imóveis” em roxo e “Administrar meu imóvel” branco com borda. À direita, painel roxo em gradiente #35104F para #4A1768, raio de 32 px, sombra suave, com “Desde 1990”, a frase “Mais que imóveis, cuidamos de histórias.” e texto de apoio. Inclua pequeno card branco sobreposto com borda dourada e a frase “Cada chave, um novo começo.”; remova esse card no mobile se houver risco de compressão.

SERVIÇOS
Depois do hero, crie faixa branca com bordas superior e inferior. Use eyebrow “Uma relação de confiança”, título “Tudo o que seu imóvel precisa, com o cuidado que você espera.” e três cards marfim: Administração patrimonial, Locação e temporada, Compra e venda. Cada card deve ter ícone linear em círculo roxo com detalhe dourado, título em Cormorant, descrição curta, raio de 16 px, padding de 28 px e hover com pequena elevação.

PÁGINAS INTERNAS
Use um Page Hero com gradiente vertical de #F1EBE1 para branco, borda inferior, badge dourado em pílula, H1 roxo em Cormorant e subtítulo cinza. Crie as páginas Administração, Quem Somos, Autoridade, Memória Viva, Blog, Contato e Imóveis.

Quem Somos deve ser narrativa: biografia em grid de 12 colunas, cartão de perfil com borda dourada, missão e visão em dois cards, valores em grid de três colunas, bloco de família com painel roxo e manifesto final em painel roxo com aspas. Memória Viva deve usar timeline vertical com linha e marcadores dourados, cards brancos e anos em Cormorant. Autoridade deve exibir estatísticas 35+, 100%, BC & Camboriú e CRECI/SC 56372-F, além de painel com fatores de confiança e checks dourados.

IMÓVEIS
Crie Custom Post Type para imóveis. Exiba cards em grid responsivo: uma coluna no mobile, duas a partir de 640 px e três a partir de 1024 px. Cada card deve ter foto real com object-fit cover e altura estável, título roxo, cidade, preço forte e botão “Ver detalhes” em pílula roxa. Use placeholder elegante marfim/roxo quando não houver imagem. Não deformar fotos.

BLOG
Cards brancos com borda e raio de 16 px. Exiba categoria em badge marfim, data com ícone de relógio dourado, título em Cormorant roxo, resumo limitado a três linhas, autor e link “Ler artigo” com seta. No hover, aplique borda dourada e sombra moderada.

FORMULÁRIOS
Use painéis brancos com raio de 24 a 32 px, borda e padding amplo. Labels pequenas em caixa alta, inputs com raio de 12 px, foco dourado, grid de duas colunas em telas médias e botão full-width roxo em pílula. Implemente estados visuais de loading, sucesso em verde claro e erro em vermelho claro. Formulário de contato: nome, e-mail, telefone/WhatsApp, assunto e mensagem. Formulário de proprietário: nome, telefone, e-mail, tipo do imóvel, bairro/cidade e observações. Aplicar nonce, sanitização, validação e proteção contra spam.

CTA E WHATSAPP
Use CTA final full-width em roxo com título branco em Cormorant, descrição suave, botão dourado com WhatsApp e botão secundário transparente com seta. Inclua botão WhatsApp fixo no canto inferior direito, círculo de 56 px, roxo, ícone branco, sombra e aria-label descritivo.

MOTION E ACESSIBILIDADE
Use apenas animações discretas: fade-up de 520 ms na entrada, hover de 180 ms, pequena elevação de botões e cards e escala de 0.97 no clique. Respeitar prefers-reduced-motion. Garantir contraste, foco por teclado, navegação sem mouse, labels associados, áreas de toque de pelo menos 44 px, alt text e HTML semântico.

RESTRIÇÕES
Não usar Arial/Roboto/Inter como fonte principal. Não criar hero genérico com carrossel. Não usar fundo totalmente branco em todas as seções. Não usar cards dentro de cards, sombras fortes, cantos quadrados, excesso de gradientes, texto centralizado em toda a página ou componentes visualmente desconectados. O site deve parecer uma imobiliária familiar experiente e confiável, não um template imobiliário comum.

ENTREGA
Entregar tema ou child theme organizado em componentes reutilizáveis, CSS com variáveis de design, templates para todas as páginas, Custom Post Type de imóveis, campos editáveis para contatos e marca, menu desktop/mobile, formulários funcionais e layout testado em 375 px, 768 px, 1024 px e 1440 px.
```

## 17. Checklist de fidelidade

- [ ] Manrope e Cormorant Garamond carregadas ou hospedadas localmente.
- [ ] Paleta usa os tokens definidos, sem cores aleatórias.
- [ ] Container máximo de 1280 px e padding responsivo correto.
- [ ] Header sticky, menu móvel e CTA de WhatsApp presentes.
- [ ] Hero da home tem composição em duas colunas e painel roxo editorial.
- [ ] Títulos usam Cormorant; textos de interface usam Manrope.
- [ ] Seções alternam marfim e branco.
- [ ] Cards têm borda discreta, sombras leves e raios consistentes.
- [ ] Botões são pílulas e têm estados hover/focus/loading.
- [ ] Rodapé roxo tem marca, navegação, atendimento, copyright e CRECI.
- [ ] Imóveis têm imagens com proporção estável e grid responsivo.
- [ ] Formulários têm sucesso, erro, loading, validação e proteção.
- [ ] Timeline, estatísticas, valores e CTA final seguem os padrões descritos.
- [ ] O layout foi conferido em mobile e desktop sem overflow ou texto cortado.
- [ ] A redução de movimento e a navegação por teclado funcionam.
