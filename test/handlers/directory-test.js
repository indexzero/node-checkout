/*
 * directory-test.js: Tests for directory checkout adapter.
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

vows.describe('directory').addBatch({
  'checkout with a "type" of "directory"': {
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
        self.dir = path.join(dir, 'directory-handler');
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