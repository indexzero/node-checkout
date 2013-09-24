/*
 * npm.js: Checkout adapter for a npm.
 *
 * (C) 2012 Bradley Meck.
 * MIT LICENSE
 *
 */

var zlib = require('zlib'),
    request = require('request'),
    tarStream = require('./tar-stream');

//
// ### function download (source, callback)
// #### @source {Object} Source npm checkout options.
// #### @callback {function} Continuation to respond to.
// Downloads the npm repository at the specified version to the specified `source.destination`.
//
exports.download = function (source, callback) {
  if (!source || !source.package || !source.version || !source.destination) {
    return callback(new Error('source.package, source.version, and source.destination are required'));
  }

  var protocol  = source.protocol || 'http',
      registry  = source.registry || 'registry.npmjs.org',
      headers   = source.headers  || {},
      proxy     = source.proxy    || null,
      name      = source.package,
      version   = source.version,
      tarball   = [name, version].join('-') + '.tgz',
      strictSsl,
      done;

  //
  // Respond to the callback once.
  //
  function finish() {
    if (!done) {
      done = true;
      callback.apply(null, arguments);
    }
  }

  //
  // Use `source['strict-ssl']` if it exists.
  //
  strictSsl = typeof source['strict-ssl'] !== 'undefined'
    ? source['strict-ssl']
    : true;
      
  //
  // Setup user-agent if it is not already set.
  //
  headers['user-agent'] = headers['user-agent'] || 'node-checkout';

  //
  // Make the request to the npm registry and pipe it to a tarStream
  //
  tarStream.download({
    destination: source.destination,
    stream: request({
      url: protocol + '://' + registry + '/' + [name, '-', tarball].join('/'),
      rejectUnauthorized: strictSsl,
      strictSSL: strictSsl,
      headers: headers
    })
    .on('error', finish)
    .pipe(zlib.Unzip())
  }, finish);
};