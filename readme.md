# octoherd-script-security-analysis

> Enable security and analysis features

[![test](https://github.com/stoe/octoherd-script-security-analysis/actions/workflows/test.yml/badge.svg)](https://github.com/stoe/octoherd-script-security-analysis/actions/workflows/test.yml) [![codeql](https://github.com/stoe/octoherd-script-security-analysis/actions/workflows/codeql.yml/badge.svg)](https://github.com/stoe/octoherd-script-security-analysis/actions/workflows/codeql.yml) [![publish](https://github.com/stoe/octoherd-script-security-analysis/actions/workflows/publish.yml/badge.svg)](https://github.com/stoe/octoherd-script-security-analysis/actions/workflows/publish.yml) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Usage

```js
npx @stoe/octoherd-script-security-analysis \
  -R "stoe/*" \
  -T 0123456789012345678901234567890123456789
```

## Options

| option     | type    | default | description                                                                        |
| ---------- | ------- | ------- | ---------------------------------------------------------------------------------- |
| `--alerts` | boolean | `false` | enable Dependabot alerts                                                           |
| `--fixes`  | string  | `false` | enable Dependabot security updates, will also enable Dependabot alerts when `true` |

One of `--alerts` or `--fixes` is required.

## Contributing

See [CONTRIBUTING.md](https://github.com/stoe/.github/blob/main/.github/CONTRIBUTING.md)

## About Octoherd

[@octoherd](https://github.com/octoherd/) is a project to help you keep your GitHub repositories in line.

## License

[MIT](license)
