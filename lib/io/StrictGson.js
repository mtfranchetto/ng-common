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
        .every(function (value, key) {
            if (typeof value === 'function')
                return true;
            return _.has(obj, key);
        })
        .valueOf();
};

module.exports = StrictGson;