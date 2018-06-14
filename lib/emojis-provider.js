/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const fs = require('fs');
const path = require('path');
const fuzzaldrin = require('fuzzaldrin');
const emoji = require('emoji-images');

module.exports = {
  selector: '.source.gfm, .text.md, .text.restructuredtext, .text.html, .text.slim, .text.plain, .text.git-commit, .comment, .string, .source.emojicode',

  wordRegex: /::?[\w\d_\+-]+$/,
  emojiFolder: 'atom://autocomplete-emojis-plus/node_modules/emoji-images/pngs',
  properties: {},
  keys: [],
  properties0: {},
  keys0: [],

  loadProperties() {
    fs.readFile(path.resolve(__dirname, '..', 'properties.json'), (error, content) => {
      if (error) { return; }

      this.properties = JSON.parse(content);
      return this.keys = Object.keys(this.properties);
    });

    return fs.readFile(path.resolve(__dirname, '..', 'properties0.json'), (error, content) => {
      if (error) { return; }

      this.properties0 = JSON.parse(content);
      return this.keys0 = Object.keys(this.properties0);
    });
  },
      // console.log(@properties0[word])


  getSuggestions({editor, bufferPosition}) {
    let isMarkdownEmojiOnly, replacementPrefix;
    let prefix = this.getPrefix(editor, bufferPosition);
    if (!((prefix != null ? prefix.length : undefined) >= 2)) { return []; }

    if (prefix.charAt(1) === ':') {
      isMarkdownEmojiOnly = true;
      replacementPrefix = prefix;
      prefix = prefix.slice(1);
    }

    let unicodeEmojis = [];
    if (atom.config.get('autocomplete-emojis-plus.enableUnicodeEmojis') && !isMarkdownEmojiOnly) {
      unicodeEmojis = this.getUnicodeEmojiSuggestions(prefix);
    }

    let markdownEmojis = [];
    if (atom.config.get('autocomplete-emojis-plus.enableMarkdownEmojis')) {
      markdownEmojis = this.getMarkdownEmojiSuggestions(prefix, replacementPrefix);
    }

    let asciiEmojiSuggestions = [];
    if (atom.config.get('autocomplete-emojis-plus.enableAsciiEmojis')) {
      asciiEmojiSuggestions = this.getAsciiEmojiSuggestion(prefix);
    }

    return unicodeEmojis.concat(markdownEmojis).concat(asciiEmojiSuggestions);
  },

  getPrefix(editor, bufferPosition) {
    const line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
    return __guard__(line.match(this.wordRegex), x => x[0]) || '';
  },

  getUnicodeEmojiSuggestions(prefix) {
    const words = fuzzaldrin.filter(this.keys, prefix.slice(1));
    return Array.from(words).map((word) => (
      {
        text: this.properties[word].emoji,
        replacementPrefix: prefix,
        rightLabel: word
      }));
  },

  getMarkdownEmojiSuggestions(prefix, replacementPrefix) {
    const words = fuzzaldrin.filter(emoji.list, prefix);
    return (() => {
      const result = [];
      for (let word of Array.from(words)) {
        let emojiImageElement = emoji(word, this.emojiFolder, 20);
        if (emojiImageElement.match(/src="(.*\.png)"/)) {
          const uri = RegExp.$1;
          emojiImageElement = emojiImageElement.replace(uri, decodeURIComponent(uri));
        }

        result.push({
          text: word,
          replacementPrefix: replacementPrefix || prefix,
          rightLabelHTML: emojiImageElement
        });
      }
      return result;
    })();
  },

  getAsciiEmojiSuggestion(prefix) {
    const words = fuzzaldrin.filter(this.keys0, prefix.slice(1));
    return Array.from(words).map((word) => (
      {
        text: this.properties0[word].asciiEmoji,
        replacementPrefix: prefix,
        rightLabel: word
      }));
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}