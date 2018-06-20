/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let EmojiCheatSheet;
const Shell = require('shell');

module.exports =
(EmojiCheatSheet = class EmojiCheatSheet {
  static showDefault() {
    return this.openUrlInBrowser('http://www.emoji-cheat-sheet.com/');
  }

  static showAscii() {
    return this.openUrlInBrowser('https://gist.github.com/samrose3/37d15db8821fe1fc8edf01db24670ceb');
  }

  static openUrlInBrowser(url) {
    return Shell.openExternal(url);
  }
});
