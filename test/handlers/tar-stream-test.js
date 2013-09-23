/*
 * tar-stream-test.js: Tests for tar stream checkout adapter.
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

vows.describe('tar-stream').addBatch({
  'checkout with a "type" of "tar-stream"': {
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
        self.dir = path.join(dir, 'tar-stream-handler');
        checkout({
          type: 'tar-stream',
          stream: fs.createReadStream(path.join(__dirname, '../fixtures/hellocoffee.tar')),
          destination: self.dir
        }, callback);
      });
    },
    'should create new directories properly': function () {
      assert(fs.statSync(path.join(this.dir, 'package.json')));
    }
  }
}).export(module);