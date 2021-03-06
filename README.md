# Autocomplete Emojis Plus

![autocomplete-emojis](https://github.com/atom/autocomplete-emojis/blob/master/doc/images/atom-autocomplete-emojis.gif?raw=true)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[![apm](https://img.shields.io/apm/v/autocomplete-emoj-plus.svg)](https://atom.io/packages/autocomplete-emoj-plus)

> Adds unicode emoji (like 😄), markdown emoji (like ```:smile:```) and ascii emoji (like ```（ ^_^）```) autocompletion to autocomplete-plus.

> TODO: Add a description

## Install

This module depends upon a knowledge of [Markdown]().

```markdown
apm install
```

## Usage

> TODO: Add.. mmm.. something.

## Features

> TODO: Improve feature set

* Shows unicode and markdown emojis as suggestions when typing ```:``` and a word<br>
　![smiley](https://github.com/atom/autocomplete-emojis/blob/master/doc/images/atom-autocomplete-emojis-smiley.png?raw=true)
* Shows only markdown emojis when typing ```::``` and a word<br>
　![markdown-smiley](https://github.com/atom/autocomplete-emojis/blob/master/doc/images/atom-autocomplete-emojis-markdown-smiley.png?raw=true)
* Disables unicode and/or markdown in the setting<br>
　![settings](https://github.com/atom/autocomplete-emojis/blob/master/doc/images/atom-autocomplete-emojis-settings.png?raw=true)
* Opens [Emoji Cheat Sheet](http://www.emoji-cheat-sheet.com/) for markdown emojis in browser
  when you run the ```autocomplete-emojis:show-cheat-sheet``` command


## Scopes

Please note that this package shows emoji suggestions in the scopes below.

* .source.gfm
* .text.md
* .text.html
* .text.slim
* .text.plain
* .text.git-commit
* .comment
* .string
* .source.emojicode

## Contribute

See [the contribute file](contribute.md)!

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## TODOs

> TODO: Add project TODOs

## Acknowledgements

> TODO: Add proper acknowledgements

* [autocomplete-plus](https://atom.io/packages/autocomplete-plus) and
  [its document of the provider API](https://github.com/atom/autocomplete-plus/wiki/Provider-API)
  inspired and helped me a lot to create this package
* [gemoji](https://github.com/github/gemoji) gives [a JSON file](https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json) for unicode emojis


## License

[MIT © Giacomo Rossetto.](../LICENSE)
