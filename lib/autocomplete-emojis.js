/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const provider = require('./emojis-provider');
const cheatSheet =  equire('./emoji-cheat-sheet')
const update = require('./update');

update.updateDefault();
update.updateAscii();

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
        return cheatSheet.showDefault();
      }
    }
    );

    return atom.commands.add('atom-workspace', {
      'autocomplete-emojis-plus:show-ascii-cheat-sheet'() {
        return cheatSheet.showAscii();
      }
    }
    );

    return atom.commands.add('atom-workspace', {
      'autocomplete-emojis-plus:update-unicode-and-markdown-emoji'() {
        return update.updateDefault();
      }
    }
    );

    return atom.commands.add('atom-workspace', {
      'autocomplete-emojis-plus:update-ascii-emoji'() {
        return update.updateAscii();
      }
    }
    );

    return atom.commands.add('atom-workspace', {
      'autocomplete-emojis-plus:update-emoji'() {
        return update.updateEmoji();
      }
    }
    );

  },

  getProvider() { return provider; }
};
