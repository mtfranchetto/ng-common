"use strict";

var Parser = require('./Parser'),
    inherits = require('inherits'),
    Gson = require('../io/Gson');

var GsonParser = function (types) {
    this._gson = new Gson(types);
};

inherits(GsonParser, Parser);

GsonParser.prototype.parse = function (data, Model) {
    return this._gson.deserialize(data, Model);
};

module.exports = GsonParser;
