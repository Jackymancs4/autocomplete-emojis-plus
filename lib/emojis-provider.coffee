fs = require('fs')
path = require('path')
fuzzaldrin = require('fuzzaldrin')
emoji = require('emoji-images')

module.exports =
  selector: '.source.gfm, .text.md, .text.restructuredtext, .text.html, .text.slim, .text.plain, .text.git-commit, .comment, .string, .source.emojicode'

  wordRegex: /::?[\w\d_\+-]+$/
  emojiFolder: 'atom://autocomplete-emojis-plus/node_modules/emoji-images/pngs'
  properties: {}
  keys: []
  properties0: {}
  keys0: []

  loadProperties: ->
    fs.readFile path.resolve(__dirname, '..', 'properties.json'), (error, content) =>
      return if error

      @properties = JSON.parse(content)
      @keys = Object.keys(@properties)

    fs.readFile path.resolve(__dirname, '..', 'properties0.json'), (error, content) =>
      return if error

      @properties0 = JSON.parse(content)
      @keys0 = Object.keys(@properties0)
      # console.log(@properties0[word])


  getSuggestions: ({editor, bufferPosition}) ->
    prefix = @getPrefix(editor, bufferPosition)
    return [] unless prefix?.length >= 2

    if prefix.charAt(1) is ':'
      isMarkdownEmojiOnly = true
      replacementPrefix = prefix
      prefix = prefix.slice(1)

    unicodeEmojis = []
    if atom.config.get('autocomplete-emojis-plus.enableUnicodeEmojis') && not isMarkdownEmojiOnly
      unicodeEmojis = @getUnicodeEmojiSuggestions(prefix)

    markdownEmojis = []
    if atom.config.get('autocomplete-emojis-plus.enableMarkdownEmojis')
      markdownEmojis = @getMarkdownEmojiSuggestions(prefix, replacementPrefix)

    asciiEmojiSuggestions = []
    if atom.config.get('autocomplete-emojis-plus.enableAsciiEmojis')
      asciiEmojiSuggestions = @getAsciiEmojiSuggestion(prefix)

    return unicodeEmojis.concat(markdownEmojis).concat(asciiEmojiSuggestions)

  getPrefix: (editor, bufferPosition) ->
    line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition])
    line.match(@wordRegex)?[0] or ''

  getUnicodeEmojiSuggestions: (prefix) ->
    words = fuzzaldrin.filter(@keys, prefix.slice(1))
    for word in words
      {
        text: @properties[word].emoji
        replacementPrefix: prefix
        rightLabel: word
      }

  getMarkdownEmojiSuggestions: (prefix, replacementPrefix) ->
    words = fuzzaldrin.filter(emoji.list, prefix)
    for word in words
      emojiImageElement = emoji(word, @emojiFolder, 20)
      if emojiImageElement.match(/src="(.*\.png)"/)
        uri = RegExp.$1
        emojiImageElement = emojiImageElement.replace(uri, decodeURIComponent(uri))

      {
        text: word
        replacementPrefix: replacementPrefix || prefix
        rightLabelHTML: emojiImageElement
      }

  getAsciiEmojiSuggestion: (prefix) ->
    words = fuzzaldrin.filter(@keys0, prefix.slice(1))
    for word in words
      {
        text: @properties0[word].asciiEmoji
        replacementPrefix: prefix
        rightLabel: word
      }
