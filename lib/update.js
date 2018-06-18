/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Run this to update the static list of properties stored in the properties.json
// file at the root of this repository.

const path = require('path');
const fs = require('fs');
const request = require('request');

const requestDefaultOptions = {
  url: 'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json',
  json: true
};

const requestDefaultOptions = {
  url: 'https://raw.githubusercontent.com/samrose3/autocomplete-ascii-emoji/master/properties.json',
  json: true
};

module.exports = {

  updateDefault() {

    return request(requestOptions, function(error, response, items) {
      if (error != null) {
        console.error(error.message);
        return false;
      }

      if (response.statusCode !== 200) {
        console.error(`Request for emoji.json failed: ${response.statusCode}`);
        return false;
      }

      const properties = {};
      for (let item of Array.from(items)) {
        if (item.emoji != null) {
          for (let alias of Array.from(item.aliases)) {
            properties[alias] = {
              emoji: item.emoji,
              // description: item.description,
              // tags: ((item.tags != null ? item.tags.length : undefined) > 1 ? item.tags : undefined)
            };
          }
        }
      }

      fs.writeFileSync(path.join(__dirname, '..', 'data/default-emoji.json'), `${JSON.stringify(properties, null, 0)}\n`);
      return true;
    });
  },
  updateAscii() {

    return request(requestOptions, function(error, response, items) {
      if (error != null) {
        console.error(error.message);
        return false;
      }

      if (response.statusCode !== 200) {
        console.error(`Request for property.json failed: ${response.statusCode}`);
        return false;
      }

      const properties = {};
      for (let item of items) {
        if (item.emoji != null) {
          for (let alias of item.aliases) {
            properties[alias] = {
              emoji: item.asciiEmoji,
            };
          }
        }
      }

      fs.writeFileSync(path.join(__dirname, '..', 'data/ascii-emoji.json'), `${JSON.stringify(properties, null, 0)}\n`);
      return true;
    });
  }
};
