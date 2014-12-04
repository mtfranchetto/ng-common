"use strict";

var PaginationObject = function () {

    this.epcrs = {};
    this.entries = [];

    this.getEpcrs = function () {
        return this.epcrs;
    };
    this.getEntries = function () {
        return this.entries;
    };
};

module.exports = PaginationObject;