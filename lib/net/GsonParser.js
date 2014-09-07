var Parser = require('./Parser'),
    inherits = require('inherits'),
    Gson = require('../io/Gson');

"use strict";

var GsonParser = function (types) {
    this._gson = new Gson(types);
};

Parser.prototype.parse = function (data, Model) {
    return this._gson.deserialize(data, Model);
};

module.exports = GsonParser;