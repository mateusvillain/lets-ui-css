# Tokens Studio + Style Dictionary

Este repositório utiliza **Tokens Studio** e **Style Dictionary** para gerenciar e exportar tokens de design de forma eficiente.

## O que são Tokens de Design?

Tokens de design são valores reutilizáveis que representam decisões de design, como cores, espaçamentos, tipografia, etc. Eles ajudam a manter consistência e escalabilidade em projetos.

## Ferramentas Utilizadas

### Tokens Studio
- Ferramenta para criar e gerenciar tokens de design diretamente no Figma.
- Permite sincronizar tokens com diferentes plataformas.

### Style Dictionary
- Biblioteca que transforma tokens de design em arquivos utilizáveis para diferentes plataformas (CSS, iOS, Android, etc.).
- Facilita a automação e integração dos tokens no fluxo de desenvolvimento.

## Como Usar

1. **Exportar Tokens do Tokens Studio**:
    - No Figma, configure e exporte os tokens para o formato JSON.
    - Salve os arquivos na pasta `tokens/`.

2. **Configurar o Style Dictionary**:
    - Certifique-se de que o arquivo de configuração (`config.json` e `build-output.js`) está ajustado para suas necessidades.

3. **Gerar Tokens Processados**:
    - Execute o comando:
      ```bash
      node build-output.js
      ```
    - Os tokens processados serão gerados na pasta `tokens/`.

4. **Integrar no Projeto**:
    - Utilize os arquivos gerados no seu projeto (CSS, SCSS, etc.).

## Scripts Disponíveis

- `node build-output.js`: Gera os tokens processados.

## Referências

- [Tokens Studio](https://tokens.studio/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
