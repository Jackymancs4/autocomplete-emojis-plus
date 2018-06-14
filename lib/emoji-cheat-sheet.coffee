Shell = require('shell')

module.exports =
class EmojiCheatSheet
  @showDefault: ->
    @openUrlInBrowser('http://www.emoji-cheat-sheet.com/')

  @showAscii: ->
    @openUrlInBrowser('https://gist.github.com/samrose3/37d15db8821fe1fc8edf01db24670ceb')

  @openUrlInBrowser: (url) ->
    Shell.openExternal(url)
