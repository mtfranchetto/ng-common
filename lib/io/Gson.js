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
                return _.has(instance, "_" + key);
            })
            .value();
    };

    var populateModel = function (Model, properties) {
        var instance = new Model();
        _.each(properties, function (value, key) {
            instance["_" + key] = value;
        });
        return instance;
    };

    this._cycle = function (json) {
        var self = this,
            Model = findObjectModel(json),
            obj = Model ? new Model() : {};
        _.each(json, function (value, key) {
            if (_.isArray(value)) {
                obj["_" + key] = [];
                _.each(value, function (listItem) {
                    obj["_" + key].push(self._cycle(listItem));
                });
            } else {
                var model = _.isObject(value) ? findObjectModel(value) : null;
                if (model) {
                    obj["_" + key] = populateModel(model, value);
                } else if (_.has(obj, "_" + key)) {
                    obj["_" + key] = value;
                }
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
    this.registerType(Model);
    return this._cycle(json);
};

module.exports = Gson;