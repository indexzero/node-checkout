/*
 * directory.js: Checkout adapter for a local directory.
 *
 * (C) 2012 Bradley Meck.
 * MIT LICENSE
 *
 */

var ncp = require('ncp').ncp;

//
// ### function download (source, callback)
// #### @source {Object} Source checkout options
// #### @callback {function} Continuation to respond to.
// Copies the `source.directory` to the specified `source.destination`.
//
exports.download = function (source, callback) {
  return ncp(source.directory, source.destination, callback);
};