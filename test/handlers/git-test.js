/*
 * git-test.js: Tests for git checkout adapter.
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

vows.describe('git').addBatch({
  'checkout with a "type" of "git"': {
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
        self.dir = path.join(dir, 'git-handler');
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