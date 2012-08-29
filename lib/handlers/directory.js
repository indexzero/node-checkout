var ncp = require('ncp').ncp;

exports.download = function (source, callback) {
   return ncp(source.directory, source.destination, callback);
}
