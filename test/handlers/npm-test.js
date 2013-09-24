/*
 * npm-test.js: Tests for npm checkout adapter.
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

vows.describe('npm').addBatch({
  'checkout with a "type" of "npm"': {
    topic: function () {
      var callback = this.callback,
          self     = this;

      tmp.dir(function (err, dir) {
        if (err) {
          return callback(err);
        }
      
        //
        // Extra folder to check creation
        //
        self.dir = path.join(dir, 'npm-handler');
        checkout({
          type: 'npm',
          package: 'checkout',
          version: '0.0.0',
          destination: self.dir
        }, callback);
      });
    },
    'should create new directories properly': function () {
      assert(fs.statSync(path.join(this.dir, 'package', 'package.json')));
    }
  }
}).export(module);