//
// checkout({
//    type: 'git',
//    url: 'git@github.com:bmeck/hello-coffee',
//    destination: 'my-apps/hello-coffee'
// }, function (err) {
//    console.error(err)
// });
//

module.exports = checkout;
function checkout(description, callback) {
   if (typeof description.type === 'function') {
      return description.type(description, callback);
   }
   if (!checkout.handlers[description.type]) {
      callback && callback(new Error('Unknown Repository type'));
      return null;
   }
   return checkout.handlers[description.type].download(description, callback);
}
checkout.handlers = {};

checkout.handlers.directory = require('./handlers/directory');
checkout.handlers['tar-stream'] = require('./handlers/tar-stream');
checkout.handlers.git = require('./handlers/git');
