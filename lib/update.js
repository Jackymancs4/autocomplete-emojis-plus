const path = require('path');
const fs = require('fs');
const request = require('request');

const requestDefaultOptions = {
  url: 'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json',
  json: true
};

const requestAsciiOptions = {
  url: 'https://raw.githubusercontent.com/samrose3/autocomplete-ascii-emoji/master/properties.json',
  json: true
};

const updateDefault = function () {

  return request(requestDefaultOptions, function(error, response, items) {
    if (error != null) {
      console.error(error.message);
      return false;
    }

    if (response.statusCode !== 200) {
      console.error(`Request for emoji.json failed: ${response.statusCode}`);
      return false;
    }

    const properties = {};
    for (let item of items) {
      if (item.emoji != null) {
        for (let alias of item.aliases) {
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
}

const updateAscii = function () {

  return request(requestAsciiOptions, function(error, response, items) {
    if (error != null) {
      console.error(error.message);
      return false;
    }

    if (response.statusCode !== 200) {
      console.error(`Request for property.json failed: ${response.statusCode}`);
      return false;
    }

    fs.writeFileSync(path.join(__dirname, '..', 'data/ascii-emoji.json'), `${JSON.stringify(items, null, 0)}\n`);
    return true;
  });
}

const updateEmoji = function () {
  updateDefault();
  updateAscii();
}

module.exports = {
  updateDefault,
  updateAscii,
  updateEmoji
};
