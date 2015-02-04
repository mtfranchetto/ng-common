"use strict";

var inherits = require('inherits'),
    Serializer = require('../io/Serializer'),
    _ = require('lodash');

var QueryStringSerializer = function () {

};

inherits(QueryStringSerializer, Serializer);

QueryStringSerializer.prototype.deserialize = function (query) {
    if (!query) return {};
    var parameters = query.split("&"),
        values = _.map(parameters, function (value) {
            var parts = value.split("=");
            return {
                key: parts[0],
                value: parts[1]
            };
        });
    return _.zipObject(_.map(values, 'key'), _.map(values, 'value'));
};

QueryStringSerializer.prototype.serialize = function (data) {
    return _.reduce(data, function (result, value, key) {
        if (result)
            result += "&";
        result += key + "=" + value;
        return result;
    }, "");
};

module.exports = QueryStringSerializer;