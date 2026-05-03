---
name: changelog-generator
description: Gerar e publicar releases de forma consistente a partir do histórico de commits. Usar esta skill quando for necessário atualizar `CHANGELOG.md`, definir próxima versão SemVer, criar tag Git, dar push da tag e criar release no GitHub. Aplicar em pedidos como "gerar changelog", "preparar release", "versionar projeto", "criar tag/release", ou quando houver necessidade de consolidar os últimos commits em notas de versão.
---

# Changelog Generator

Conduzir o fluxo completo de release com rastreabilidade: commits recentes -> entrada de changelog -> versão -> tag -> release no GitHub.

## Modelo de Versionamento

Este projeto usa **lockstep versioning**: todos os packages (`@lets-ui/tokens`, `@lets-ui/styles`, `@lets-ui/components`) compartilham **sempre a mesma versão**. A tag canônica é `vX.Y.Z` (na raiz). Não existem tags por package.

O único `CHANGELOG.md` relevante é o da raiz do monorepo. Os arquivos em cada package são stubs que apontam para ele.

## Fluxo Obrigatório

1. Verificar branch atual, árvore limpa e sincronismo com remoto.
2. Levantar commits desde a última tag.
3. Definir bump de versão (SemVer).
4. Atualizar `CHANGELOG.md` (raiz).
5. Atualizar `version` nos três `package.json` publicáveis para o mesmo valor.
6. Criar commit de release.
7. Criar tag anotada da versão.
8. Dar push da branch e da tag.
9. Criar release no GitHub usando as notas do changelog.

## Pré-checks (Bloqueantes)

Executar antes de editar arquivos:

- Confirmar `git status --porcelain` vazio.
- Confirmar branch de release (normalmente `main`).
- Confirmar que a branch local está atualizada (`git fetch --tags` e comparação com remoto).
- Identificar última tag com `git describe --tags --abbrev=0` (formato `vX.Y.Z`).
- Interromper se a nova versão já existir em tag remota/local.

## Coletar Commits

Extrair mudanças relevantes:

- Com tag anterior: `git log <ultima-tag>..HEAD --pretty=format:'%h %s'`.
- Sem tag anterior: `git log --pretty=format:'%h %s'`.
- Agrupar por tipo (`feat`, `fix`, `perf`, `refactor`, `docs`, `chore`, `test`, `build`, `ci`).
- Ignorar commits irrelevantes para release notes (ex.: merges ruidosos) quando necessário.

## Versionamento

Definir SemVer com base nos commits:

- `major`: breaking change.
- `minor`: novas features sem quebra.
- `patch`: correções e ajustes sem quebra.

Se a versão não vier no pedido:

- Inferir pelos commits.
- Explicar a inferência na saída.

## Atualizar `CHANGELOG.md` (raiz)

Seguir o padrão em `references/changelog-format.md`.
Incluir:

- Cabeçalho da versão no formato `## [vX.Y.Z] - DD-MM-YYYY`.
- Seções por tipo de mudança.
- Links de comparação quando aplicável.

Não inventar mudanças: usar apenas commits reais.

## Atualizar `package.json` dos packages publicáveis

Alterar o campo `version` em:

- `packages/lets-ui-tokens/package.json`
- `packages/styles/package.json`
- `packages/lets-ui-components/package.json`

Todos devem receber o mesmo valor.

## Publicação (Tag + GitHub Release)

Executar nesta ordem:

1. Commitar `CHANGELOG.md` e os três `package.json` com a nova versão.
2. Criar tag anotada: `git tag -a vX.Y.Z -m "vX.Y.Z"`.
3. Dar push da branch.
4. Dar push da tag: `git push origin vX.Y.Z`.
5. Criar release no GitHub com título/tag `vX.Y.Z` e notas derivadas do changelog.

Preferir `gh release create vX.Y.Z --title "vX.Y.Z" --notes-file <arquivo-temp-com-notas>`.

## Critérios Adicionais Recomendados

Além dos critérios pedidos, aplicar:

- Validar que o link/referência da release aponta para commit/tag corretos.
- Evitar pular versão (ex.: `v1.2.0` após `v1.1.9`, salvo pedido explícito).
- Incluir resumo objetivo e lista de mudanças por categoria.
- Reportar pendências que bloqueiam release (working tree suja, falta de permissão GitHub, ausência de commits desde última tag).
- Não forçar publicação parcial: se falhar tag/release, reportar estado exato e próximos comandos seguros.

## Formato de Saída

Sempre informar:

- Última tag encontrada.
- Intervalo de commits usado.
- Versão escolhida e justificativa (`major`/`minor`/`patch`).
- Arquivos alterados (`CHANGELOG.md`, três `package.json`).
- Status de commit, tag, push e release GitHub.
- Pendências ou falhas, com comando recomendado para recuperação.

## Referências

- Ler `references/changelog-format.md` para o template mínimo do `CHANGELOG.md`.
