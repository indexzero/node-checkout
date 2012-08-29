var assert = require('assert');
var vows = require('vows');
var tmp = require('tmp');
var path = require('path');
var fs = require('fs');
var checkout = require('../..');

vows.describe('git').addBatch({
   'checkout with a "type" of "git"': {
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
            self.dir = path.join( dir, 'git-handler');
            checkout({
               type: 'git',
               url: 'https://github.com/bmeck/hellocoffee.git',
               destination: self.dir
            }, callback);
         });
      },
      'should create new directories properly': function () {
         assert(fs.statSync(path.join(this.dir, 'package.json')));
      }
   }
}).export(module);