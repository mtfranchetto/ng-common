"use strict";

var Parser = require('./Parser'),
    inherits = require('inherits'),
    StrictGson = require('../io/StrictGson');

var StrictGsonparser = function (types) {
    this._gson = new StrictGson(types);
};

inherits(StrictGsonparser, Parser);

StrictGsonparser.prototype.parse = function (data, Model) {
    return this._gson.deserialize(data, Model);
};

module.exports = StrictGsonparser;
