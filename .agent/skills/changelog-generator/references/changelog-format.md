# Changelog Format

Usar este formato mínimo ao atualizar `CHANGELOG.md`.

## Estrutura

```md
# Changelog

## [vX.Y.Z] - DD-MM-YYYY

### Added

- ...

### Changed

- ...

### Fixed

- ...

### Docs

- ...

[Compare: vA.B.C...vX.Y.Z](https://github.com/<owner>/<repo>/compare/vA.B.C...vX.Y.Z)
```

## Regras

- Criar nova entrada no topo (mais recente primeiro).
- Usar apenas mudanças derivadas dos commits no intervalo da release.
- Evitar texto genérico; descrever impacto de usuário quando possível.
- Preservar histórico existente, sem reescrever versões antigas.
- Se não existir tag anterior, omitir linha de compare ou usar comparação a partir do primeiro release.

## Mapeamento sugerido de commits

- `feat` -> `Added`
- `fix` -> `Fixed`
- `perf` -> `Changed`
- `refactor` -> `Changed`
- `docs` -> `Docs`
- `build`, `ci`, `test`, `chore` -> incluir só quando relevante para consumidores da release
