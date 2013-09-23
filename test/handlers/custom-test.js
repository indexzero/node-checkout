/*
 * custom-test.js: Tests for custom checkout adapter.
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