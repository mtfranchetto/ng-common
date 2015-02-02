"use strict";

var TestModel = function () {
    this.user = "";
    this.password = "";
    this.others = [];
    this.testModel = {};

    this.getFoo = function () {
        return this.foo;
    };
};

module.exports = TestModel;