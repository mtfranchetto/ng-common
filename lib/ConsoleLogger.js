var Logger = require('./Logger'),
    inherits = require('inherits');

"use strict";

var ConsoleLogger = function () {
    this._console = window.console;
};

inherits(ConsoleLogger, Logger);

Logger.prototype.debug = function (data) {
    this._console.dir(data);
};

Logger.prototype.warning = function () {
    this._console.warn(data);
};

Logger.prototype.error = function (data) {
    this._console.error(data);
};

module.exports = ConsoleLogger;