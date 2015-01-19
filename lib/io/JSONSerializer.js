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
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
};

module.exports = JSONSerializer;