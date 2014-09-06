"use strict";

var Serializer = require('./Serializer'),
    inherits = require('inherits'),
    _ = require('underscore');

var Gson = function (_typeAdapters) {
    var typeAdapters = [],
        typeInstances = [];

    if (_typeAdapters)
        _.each(_typeAdapters, this.registerTypeAdapter);

    this.registerTypeAdapter = function (Model) {
        if (_.isArray(Model))
            typeAdapters = _.union(typeAdapters, Model);
        else if (!_.contains(typeAdapters, Model))
            typeAdapters.push(Model);
        mapInstanceItems();
    };

    var mapInstanceItems = function () {
        typeInstances = typeAdapters.map(function (Item) {
            return new Item();
        });
    };

    var findObjectInstance = function (obj) {
        _.find(typeInstances, function (instance) {
            return containsAllFields(obj, instance);
        });
    };

    var containsAllFields = function (obj, instance) {
        _.chain(_.keys(obj))
            .every(function (key) {
                return _.has(instance, "_" + key);
            })
            .value();
    };

    var populateObject = function (Model, properties) {
        var instance = new Model();
        _.each(properties, function (value, key) {
            instance["_" + key] = value;
        });
        return instance;
    };

    this._cycle = function (json, obj) {
        _.each(json, function (value, key) {
            if (!_.has(obj, key)) return;
            if (_.isArray(value)) {
                obj["_" + key] = [];
                _.each(value, function (arrayItem) {
                    obj["_" + key].push(this._cycle(arrayItem, obj));
                })
            } else {
                var model = _.isObject(value) ? findObjectInstance(value) : null;
                if (model) {
                    obj["_" + key] = populateObject(model, value);
                } else {
                    obj["_" + key] = value;
                }
            }
        });

        return obj;
    };
};

inherits(Gson, Serializer);

Gson.prototype.serialize = function (data) {
    return JSON.stringify(data);
};

Gson.prototype.deserialize = function (data, Model) {
    var json = JSON.parse(data),
        obj = new Model();
    return this._cycle(json, obj);
};

module.exports = Gson;