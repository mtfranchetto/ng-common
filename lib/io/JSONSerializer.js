"use strict";

var JSONSerializer = function () {

};

JSONSerializer.prototype.serialize = function (data) {
    return JSON.stringify(data);
};

JSONSerializer.prototype.deserialize = function (data) {
    return JSON.parse(data);
};

module.exports = JSONSerializer;