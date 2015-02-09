"use strict";

var inherits = require('inherits'),
    Gson = require('./Gson'),
    _ = require('lodash');

var StrictGson = function (_types) {
    Gson.call(this, _types);
};

inherits(StrictGson, Gson);

StrictGson.prototype._containsAllFields = function (obj, instance) {
    return _.chain(instance)
        .omit(_.isFunction)
        .every(function (value, key) {
            return _.has(obj, key);
        })
        .valueOf();
};

module.exports = StrictGson;