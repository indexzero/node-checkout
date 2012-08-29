var assert = require('assert');
var vows = require('vows');
var tmp = require('tmp');
var path = require('path');
var fs = require('fs');
var checkout = require('../..');

vows.describe('unknown').addBatch({
   'checkout with an unknown "type"': {
      topic: function () {
         var self = this;
         var callback = this.callback;
         tmp.dir(function (err, dir) {
            if (err) {
               callback(err);
               return;
            }
            self.dir = path.join( dir, 'unknown-handler');
            checkout({
               type: null
            }, callback.bind(self, null));
         });
      },
      'should error properly': function (err) {
         assert(err);
      }
   }
}).export(module);