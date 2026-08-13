Title: CRUD completo de imóveis com upload de fotos

Labels: Nova função, prioridade:alta

Descrição
Implementar o CRUD completo de imóveis com suporte a upload/gestão de fotos. Usar o storage provider abstrato (src/lib/storage) com LocalStorageProvider escrevendo em public/uploads no ambiente de desenvolvimento.

Escopo
- Endpoint de upload: POST /api/uploads (multipart/form-data) -> retorna { url, path }
- Fluxo de criação de imóvel via painel:
  - Uploads feitos via /api/uploads (client-side) retornam urls
  - Ao submeter o form, payload inclui photos: [{ url, alt, position, isCover }]
  - API /api/imoveis cria o Imovel e associa Fotos (prisma.foto.createMany)
  - Após sucesso, revalidatePath('/imoveis') e revalidatePath(`/imoveis/${slug}`)
- UI admin: permitir upload multi, previews, set cover, remove, reorder (base implementation)
- Testes: Playwright smoke que faz login -> upload -> create -> verifica listagem pública

Critérios de aceitação
- Uploads gravam em public/uploads e retornam url utilizável no site
- Criação via UI com fotos resulta em fotos persistidas no DB (tabela Foto)
- Página pública mostra imagens do imóvel recém-criado imediatamente (on-demand revalidate)
- API mantém proteção requireAdmin

Riscos e dependências
- Uploads em produção requererão provider S3 (pendente credenciais)
- Revisar limites de tamanho de upload e validação de tipos (imagens apenas)

Branch: issue-4-crud-uploads

Checklist
- [ ] Implementar endpoint /api/uploads
- [ ] Adaptar admin UI para upload e associar fotos
- [ ] Persistir fotos no DB e garantir ordem/isCover
- [ ] E2E Playwright smoke
- [ ] Documentação e instruções de dev (README)
