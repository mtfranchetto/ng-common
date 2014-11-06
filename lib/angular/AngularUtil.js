"use strict";

var AngularUtil = function () {
    this.factoryfy = function (Service) {
        return function () {
            return Service;
        }
    };
};

module.exports = new AngularUtil();