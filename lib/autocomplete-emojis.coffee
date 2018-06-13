provider = require('./emojis-provider')

module.exports =
  config:
    enableUnicodeEmojis:
      type: 'boolean'
      default: true
    enableMarkdownEmojis:
      type: 'boolean'
      default: true
    enableAsciiEmojis:
      type: 'boolean'
      default: true

  activate: ->
    provider.loadProperties()

    atom.commands.add 'atom-workspace',
      'autocomplete-emojis-plus:show-cheat-sheet': ->
        require('./emoji-cheat-sheet').showDefault()

    atom.commands.add 'atom-workspace',
      'autocomplete-emojis-plus:show-ascii-cheat-sheet': ->
        require('./emoji-cheat-sheet').showAscii()

  getProvider: -> provider
