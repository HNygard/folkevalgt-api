[![Build Status](https://travis-ci.com/Alheimsins/folkevalgt-api.svg?branch=master)](https://travis-ci.com/Alheimsins/folkevalgt-api)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# folkevalgt-api

Proof of concept av felles api for kontaktinformasjon til folkevalgte.

Støtter data hentet fra løsninger levert av Prokom, Acos og Tieto.

# API

## ```GET /kommuner```

Lister ut alle registrerte kommuner

```bash
$ curl https://folkevalgt.alheimsins.net/kommuner
```

## ```GET /fylker```

Lister ut alle registrerte fylker

```bash
$ curl https://folkevalgt.alheimsins.net/fylker
```

## ```GET /:områdenummer```

Lister ut alle registrerte utvalg på bakgrunn av fylkesnummer eller kommunenummer

```bash
$ curl https://folkevalgt.alheimsins.net/08
```

## ```GET /:områdenummer/:utvalgsId```

Lister ut alle medlemmer i utvalg på bakgrunn av fylkesnummer/kommunenummer og utvalgsId

```bash
$ curl https://folkevalgt.alheimsins.net/08/216162
```

## License

[MIT](LICENSE)