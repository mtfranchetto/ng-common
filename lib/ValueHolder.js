"use strict";

var ValueHolder = function (value) {
    this._value = value || null;
};

ValueHolder.prototype.getValue = function () {
    return this._value;
};

ValueHolder.prototype.setValue = function (value) {
    this._value = value;
};

ValueHolder.prototype.hasValue = function () {
    return !!this._value;
};

module.exports = ValueHolder;