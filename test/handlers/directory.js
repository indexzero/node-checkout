var assert = require('assert');
var vows = require('vows');
var tmp = require('tmp');
var path = require('path');
var fs = require('fs');
var checkout = require('../..');

vows.describe('directory').addBatch({
   'checkout with a "type" of "directory"': {
      topic: function () {
         var self = this;
         var callback = this.callback;
         tmp.dir(function (err, dir) {
            if (err) {
               callback(err);
               return;
            }
            //
            // Extra folder to check creation
            //
            self.dir = path.join( dir, 'directory-handler');
            checkout({
               type: 'directory',
               directory: path.join(__dirname, '../fixtures/hellocoffee'),
               destination: self.dir
            }, callback);
         });
      },
      'should create new directories properly': function () {
         assert(fs.statSync(path.join(this.dir, 'package.json')));
      }
   }
}).export(module);