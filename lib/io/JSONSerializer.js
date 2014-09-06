"use strict";

var Serializer = require('./Serializer'),
    inherits = require('inherits');

var JSONSerializer = function () {

};

inherits(JSONSerializer, Serializer);

JSONSerializer.prototype.serialize = function (data) {
    return JSON.stringify(data);
};

JSONSerializer.prototype.deserialize = function (data) {
    return JSON.parse(data);
};

module.exports = JSONSerializer;