/*
 * unknown-test.js: Tests for unknown checkout adapter.
 *
 * (C) 2012 Bradley Meck.
 * MIT LICENSE
 *
 */

var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    vows = require('vows'),
    tmp = require('tmp'),
    checkout = require('../..');

vows.describe('unknown').addBatch({
  'checkout with an unknown "type"': {
    topic: function () {
      var callback = this.callback,
          self     = this;

      tmp.dir(function (err, dir) {
        if (err) {
          return callback(err);
        }
         
        self.dir = path.join(dir, 'unknown-handler');
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