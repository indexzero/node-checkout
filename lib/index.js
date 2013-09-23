/*
 * index.js: Top-level include for the node-checkout module.
 *
 * (C) 2012 Bradley Meck.
 * MIT LICENSE
 *
 */

//
// ### function checkout (description, callback)
// #### @description {Object}   Description to checkout
// #### @callback    {function} Continuation to respond to.
// Attempts to checkout the specified `description` based on the
// set of know available handlers. e.g.
//
//     checkout({
//       type: 'git',
//       url: 'git@github.com:bmeck/hello-coffee',
//       destination: 'my-apps/hello-coffee'
//     }, function (err) {
//       console.error(err)
//     });
//
module.exports = function checkout(description, callback) {
  if (typeof description.type === 'function') {
    return description.type(description, callback);
  }
  else if (!checkout.handlers[description.type]) {
    return callback
      ? callback(new Error('Unknown Repository type'))
      : null;
  }

  return checkout.handlers[description.type].download(description, callback);
};

//
// Expose the necessary handlers.
//
module.exports.handlers = {
  directory:    require('./handlers/directory'),
  git:          require('./handlers/git'),
  npm:          require('./handlers/npm'),
  'tar-stream': require('./handlers/tar-stream'),
};