/*
 * git.js: Checkout adapter for a git.
 *
 * (C) 2012 Bradley Meck.
 * MIT LICENSE
 *
 */

var spawn = require('child_process').spawn,
    path  = require('path');

//
// ### function download (source, callback)
// #### @source {Object} Source checkout options
// #### @callback {function} Continuation to respond to.
// Downloads the git `source.url` to the specified `source.destination`.
//
exports.download = function (source, callback) {
  return spawn('git', ['clone', source.url, path.resolve(source.destination)])
    .on('exit', function (code) {
      if (callback) {
        return code
          ? callback(new Error('git exited with code : ' + code))
          : callback();
      }
    });
};