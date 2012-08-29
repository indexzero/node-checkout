var assert = require('assert');
var vows = require('vows');
var tmp = require('tmp');
var path = require('path');
var fs = require('fs');
var checkout = require('../..');

vows.describe('custom').addBatch({
   'checkout with an function as "type"': {
      topic: function () {
         var callback = this.callback;
         this.fn = function () {};
         checkout(this.description = {type: callback.bind(this)}, this.fn);
      },
      'should send out the appropriate arguments properly': function (description, callback) {
         assert.equal(this.description, description);
         assert.equal(this.fn, callback);
      }
   }
}).export(module);