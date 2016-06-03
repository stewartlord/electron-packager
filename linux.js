'use strict'

const common = require('./common')
const fs = require('fs-extra')
const path = require('path')

module.exports = {
  createApp: function createApp (opts, templatePath, callback) {
    common.initializeApp(opts, templatePath, path.join('resources', 'app'), function buildLinuxApp (err, tempPath) {
      if (err) return callback(err)
      if (path.join(tempPath, 'brave') !== path.join(tempPath, opts.name)) {
        fs.move(path.join(tempPath, 'brave'), path.join(tempPath, opts.name), function (err) {
          if (err) return callback(err)
          common.moveApp(opts, tempPath, callback)
        })
      } else {
        common.moveApp(opts, tempPath, callback)
      }
    })
  }
}
