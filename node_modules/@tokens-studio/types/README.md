# Tokens Studio Types

![NPM version badge](https://img.shields.io/npm/v/@tokens-studio/types) ![License badge](https://img.shields.io/github/license/tokens-studio/types)

This repository is a collection of type definitions relating to Tokens Studio.

It currently exports types for all the available types of Design Tokens, as they exist in the Tokens Studio Figma Plugin.
It also includes some type definitions for things like the `$themes.json` schema, HSLA/RGBA values, color modifier options and composition tokens.

## Installation

With [NPM](https://www.npmjs.com/):

```sh
npm install @tokens-studio/types
```

## Documentation

See our documentation site [here](https://tokens-studio.github.io/types/)

## Usage

```ts
import { SingleTypographyToken } from '@tokens-studio/types';

function logTypographyToken(token: SingleTypographyToken) {
  // because token is properly typed, we get autocomplete
  // e.g. token.type will be typed as "typography"
  const { value } = token;
  if (typeof value === 'string') {
    console.log(value);
  } else {
    // due to proper type, we get these properties autosuggested properly
    console.log(`${value.fontWeight} ${value.fontSize}/${value.lineHeight} ${value.fontFamily}`);
  }
}
```
