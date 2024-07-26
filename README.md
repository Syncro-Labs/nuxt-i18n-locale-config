<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: nuxt-i18n-locale-config
- Description: My new Nuxt module
-->

# Nuxt i18n locale config

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A nuxt module to allow configuration of i18n locales in locale files instead of nuxt.config.ts
\
Check playground for example.

<!-- - [✨ &nbsp;Release Notes](/CHANGELOG.md) -->
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-i18n-locale-config?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- Individual files for locale configs
- Each locale config contains meta data along with date & number configurations.
- Fully typed

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-i18n-locale-config
```

That's it! You can now use My Module in your Nuxt app ✨


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  bun install
  
  # Generate type stubs
  bun run dev:prepare
  
  # Develop with the playground
  bun run dev
  
  # Build the playground
  bun run dev:build
  
  # Run ESLint
  bun run lint
  
  # Run Vitest, currently no tests available
  bun run test
  bun run test:watch
  
  # Release new version
  bun run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-i18n-locale-config/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-i18n-locale-config

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-i18n-locale-config.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-i18n-locale-config

[license-src]: https://img.shields.io/npm/l/nuxt-i18n-locale-config.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-i18n-locale-config

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
