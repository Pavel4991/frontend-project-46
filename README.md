# CLI gendiff
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Pavel4991_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Pavel4991_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Pavel4991_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Pavel4991_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Pavel4991_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Pavel4991_frontend-project-46)
[![gendiff-check](https://github.com/Pavel4991/frontend-project-46/actions/workflows/gendiff-check.yml/badge.svg)](https://github.com/Pavel4991/frontend-project-46/actions/workflows/gendiff-check.yml)
### Hexlet tests and linter status:
[![Actions Status](https://github.com/Pavel4991/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Pavel4991/frontend-project-46/actions)

## Description
The app compares two files in JSON, YAML or YML formats, visually highlighting their differences. It supports both flat and nested file structures.


## Use Cases

### Flat files comparison

[Example with different extensions](https://asciinema.org/a/RsZYwQ0x6oRnk6AFefyXdys61)

First file:
```json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
```
Second file:
```json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```

Comparison:
```console
$ gendiff filepath1.json filepath2.json

{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}
```

### Nested files comparison

[Example with different extensions](https://asciinema.org/a/16bn1bXXcAr088S0Ma9lI52fw)

Comparison:
```console
$ gendiff filepath1.json filepath2.json

{
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```


### Output formats

This application supports several output formats. Available options for output are stylish, plain, and json. These can be specified using the flag -f or --format. The default format is stylish.

[Example](https://asciinema.org/a/8MmfIgxKzNX6Ow4LJ9WEoFSJa)

```console
gendiff --format plain filepath1.json filepath2.json

Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
