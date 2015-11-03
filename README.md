# textstat

textstat is a statistics tool for text and markdown, html.

textstat is built on top of [textlint](https://github.com/textlint/textlint "textlint").
textstat is built on top of [textlint](https://github.com/textlint/textlint "textlint").

## Installation

    npm install textstat

## Usage

The same way of [textlint](https://github.com/textlint/textlint "textlint").

The difference between textstat and textlint is that `textstat` has some built-in rules.

### CLI

```
textstat [options] file.md [file.txt] [dir]

Options:
  -h, --help                 Show help.
  -c, --config path::String  Use configuration from this file or sharable config.
  --plugin [String]          Specify plugins
  --rule [path::String]      Set rule package name and set all default rules to off.
  --rulesdir [path::String]  Set rules from this directory and set all default rules to off.
  -f, --format String        Use a specific output format.
  -v, --version              Outputs the version number.
  --ext [String]             Specify text file extensions.
  -o, --output-file path::String  Enable report to be written to a file.
  --quiet                    Report errors only. - default: false
  --stdin                    Lint code provided on <STDIN>. - default: false
```

Example:

```
$ textstat ja/ESLint/
┌──────────────────────┬─────────────────────┐
│ filePath             │ ja/ESLint/README.md │
├──────────────────────┼─────────────────────┤
│ fileSize             │ 14.46 kB            │
├──────────────────────┼─────────────────────┤
│ number of characters │ 8681                │
├──────────────────────┼─────────────────────┤
│ number of Lines      │ 306                 │
├──────────────────────┼─────────────────────┤
│ number of Images     │ 0                   │
├──────────────────────┼─────────────────────┤
│ number of Links      │ 22                  │
├──────────────────────┼─────────────────────┤
│ number of List Items │ 22                  │
├──────────────────────┼─────────────────────┤
│ number of sentences  │ 160                 │
├──────────────────────┼─────────────────────┤
│ share of code        │ 30%                 │
└──────────────────────┴─────────────────────┘
```

### .textstatrc


`.textstatrc` is config file that is loaded as YAML, JSON or JS via [MoOx/rc-loader](https://github.com/MoOx/rc-loader "MoOx/rc-loader").

```
$ textstat --rule number-of-lines README.md
```

is equal to

```json
{
  "rules": {
    "number-of-lines": true
  }
}
```

The config object can define rule's option.

```json
{
  "rules": {
    "number-of-lines": false, // disable
    "very-nice-rule": {
        "key": "value"
    }
  }
}
```

Pass rule's options("key": "value") to `very-nice-rule`.

It mean that use the following format:

```js
{
  "rules": {
    "<rule-name>": true | false | object
  }
}
```

### Plugins

textstat plugin is a set of rules and rulesConfig or customize parser.

To enable plugin, put the "plugin-name` into `.textstat`.

```js
// `.textstatrc`
{
    "plugins": [
        "plugin-name"
    ],
    // overwrite-plugins rules config
    // <plugin>/<rule>
    "rules": {
        "plugin-name/rule-name" : false
    }
}
```

Example

    $ npm install textstat-plugin-ja textstat -D

To enable `ja` plugin and add to `.textstatrc`

```
{
    "plugins":[
        "ja"
    ]
}
```

## Tips

### Disable built-in rules

Add `false` to the rule of `.textstatrc`

```js
{
    "rules": {
        "file-size" : false,
        "share-of-code" : false
    }
}
```

### for japanese

- [azu/textstat-plugin-ja](https://github.com/azu/textstat-plugin-ja "azu/textstat-plugin-ja")

> textstatで使える日本語向けの統計ルール集

```
$ npm install textstat-plugin-ja textstat -D
$ textstat --plugin ja README.md
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT