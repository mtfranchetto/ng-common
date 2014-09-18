"use strict";

var Serializer = require('./Serializer'),
    inherits = require('inherits'),
    _ = require('underscore');

var Gson = function (_types) {
    var types = [],
        instances = [];

    this.registerType = function (Model) {
        if (_.isArray(Model))
            types = _.union(types, Model);
        else if (!_.contains(types, Model))
            types.push(Model);
        mapInstanceItems();
    };

    var mapInstanceItems = function () {
        instances = types.map(function (Item) {
            return new Item();
        });
    };

    var findObjectModel = function (obj) {
        return _.find(types, function (types, index) {
            return containsAllFields(obj, instances[index]);
        });
    };

    var containsAllFields = function (obj, instance) {
        return _.chain(_.keys(obj))
            .every(function (key) {
                return _.has(instance, key);
            })
            .value();
    };

    var populateModel = function (Model, properties) {
        var instance = new Model();
        _.each(properties, function (value, key) {
            instance[key] = value;
        });
        return instance;
    };

    this._cycle = function (json) {
        var self = this,
            Model = findObjectModel(json),
            obj = Model ? new Model() : {};
        _.each(json, function (value, key) {
            if (_.isArray(value)) {
                obj[key] = [];
                _.each(value, function (listItem) {
                    obj[key].push(self._cycle(listItem));
                });
            } else if (_.isObject(value)) {
                obj[key] = self._cycle(value);
            } else if (_.has(obj, key)) {
                obj[key] = value;
            }
        });

        return obj;
    };

    if (_types)
        _.each(_types, this.registerType);
};

inherits(Gson, Serializer);

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