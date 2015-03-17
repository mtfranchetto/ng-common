"use strict";

var JSONSerializer = require('./JSONSerializer'),
    _ = require('lodash');

var SettingsManager = function (data, serializer) {
    this._data = data || {};
    this._serializer = serializer || new JSONSerializer();
};

SettingsManager.prototype.getValue = function (key, defaultValue) {
    if (typeof this._data[key] !== 'undefined')
        return this._data[key];
    else if (hasLocalStorageSupport())
        return this._serializer.deserialize(window.localStorage.getItem(key));
    else
        return defaultValue;
};

SettingsManager.prototype.setValue = function (key, value) {
    if (key) {
        this._data[key] = value;
        if (hasLocalStorageSupport())
            window.localStorage.setItem(key, this._serializer.serialize(value));
    } else {
        this._data = _.merge(this._data, value);
    }
};

function hasLocalStorageSupport() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

module.exports = SettingsManager;