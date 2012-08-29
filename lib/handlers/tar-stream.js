var tar = require("tar");
exports.download = function (source, callback) {
   var done = false;
   function finish() {
      if (done) return;
      done = true;
      callback.apply(this, arguments);
   }
   source.stream.pipe(tar.Extract({ path: source.destination }))
   .on("error", finish)
   .on("end", finish)
}
