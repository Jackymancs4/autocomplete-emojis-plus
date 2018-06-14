/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const provider = require('./emojis-provider');

module.exports = {
  config: {
    enableUnicodeEmojis: {
      type: 'boolean',
      default: true
    },
    enableMarkdownEmojis: {
      type: 'boolean',
      default: true
    },
    enableAsciiEmojis: {
      type: 'boolean',
      default: true
    }
  },

  activate() {
    provider.loadProperties();

    atom.commands.add('atom-workspace', {
      'autocomplete-emojis-plus:show-cheat-sheet'() {
        return require('./emoji-cheat-sheet').showDefault();
      }
    }
    );

    return atom.commands.add('atom-workspace', {
      'autocomplete-emojis-plus:show-ascii-cheat-sheet'() {
        return require('./emoji-cheat-sheet').showAscii();
      }
    }
    );
  },

  getProvider() { return provider; }
};
