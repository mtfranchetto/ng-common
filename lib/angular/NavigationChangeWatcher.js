"use strict";

var Watcher = require('../Watcher'),
    inherits = require('inherits'),
    _ = require('lodash');

var NavigationChangeWatcher = function (scope) {
    this._scope = scope;
};

inherits(NavigationChangeWatcher, Watcher);

NavigationChangeWatcher.prototype.watch = function () {
    this._handleChange(this._scope, location.href);
    this._scope.$on("$locationChangeStart", _.bind(function (event, nextLocation, currentLocation) {
        this._handleChange(this._scope, nextLocation, currentLocation);
    }, this));
};

NavigationChangeWatcher.prototype._handleChange = function (scope, nextLocation, currentLocation) {

};

module.exports = NavigationChangeWatcher;
