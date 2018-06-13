# Run this to update the static list of properties stored in the properties.json
# file at the root of this repository.

path = require 'path'
fs = require 'fs'
request = require 'request'

requestOptions =
  url: 'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json'
  json: true

module.exports =

  updateDefault: ->

    request requestOptions, (error, response, items) ->
      if error?
        console.error(error.message)
        return false

      if response.statusCode isnt 200
        console.error("Request for emoji.json failed: #{response.statusCode}")
        return false

      properties = {}
      for item in items
        if item.emoji?
          for alias in item.aliases
            properties[alias] =
              emoji: item.emoji
              description: item.description
              tags: item.tags if item.tags?.length > 1

      fs.writeFileSync(path.join(__dirname, 'properties.json'), "#{JSON.stringify(properties, null, 0)}\n")
      return true
