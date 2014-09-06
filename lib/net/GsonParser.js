var Parser = require('./Parser'),
    inherits = require('inherits'),
    Gson = require('../io/Gson');

"use strict";

var GsonParser = function (typeAdapters) {
    this._gson = new Gson(typeAdapters);
};

Parser.prototype.parse = function (data, Model) {
    return this._gson.deserialize(data, Model);
};

module.exports = GsonParser;