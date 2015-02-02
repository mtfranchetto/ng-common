"use strict";

var Serializer = require('./Serializer'),
    inherits = require('inherits'),
    _ = require('lodash');

var Gson = function (types) {
    this._types = [];
    this._instances = [];

    if (types)
        _.forEach(types, this.registerType, this);
};

inherits(Gson, Serializer);

Gson.prototype.registerType = function (Model) {
    if (_.isArray(Model))
        this._types = _.union(this._types, Model);
    else if (!_.contains(this._types, Model))
        this._types.push(Model);
    this._mapInstanceItems();

};

Gson.prototype._mapInstanceItems = function () {
    this._instances = _.map(this._types, function (Item) {
        return new Item();
    });
};

Gson.prototype._findObjectModel = function (obj) {
    if (_.isArray(obj)) {
        obj = obj[0];
    }
    return _.find(this._types, function (types, index) {
        return this._containsAllFields(obj, this._instances[index]);
    }, this);
};

Gson.prototype._containsAllFields = function (obj, instance) {
    return _.chain(obj)
        .keys()
        .every(function (key) {
            return _.has(instance, key);
        })
        .valueOf();
};

Gson.prototype._cycle = function (json) {
    var Model = this._findObjectModel(json),
        obj = Model ? new Model() : {};

    if (_.isArray(json)) {
        obj = [];
        _.forEach(json, function (listItem) {
            obj.push(this._cycle({obj: listItem}).obj);
        }, this);
        return obj;
    }
    if (!_.isObject(json)) {
        return json;
    }
    _.forEach(json, function (value, key) {
        if (_.isArray(value)) {
            obj[key] = [];
            _.forEach(value, function (listItem) {
                obj[key].push(this._cycle(listItem));
            }, this);
        } else if (_.isObject(value)) {
            obj[key] = this._cycle(value);
        } else {
            obj[key] = value;
        }
    }, this);
    return obj;
};

Gson.prototype.serialize = function (data) {
    return JSON.stringify(data);
};

Gson.prototype.deserialize = function (json, Model) {
    if (Model)
        this.registerType(Model);
    if (_.isString(json)) {
        try {
            json = JSON.parse(json);
        } catch (e) {
            json = {};
        }
    }
    return this._cycle(json);
};

module.exports = Gson;
