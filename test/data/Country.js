"use strict";

var Country = function () {
    this.id = 0;
    this.phrase_text = "";
    this.has_states = false;
    this.code = "";
    this.code3 = "";
    this.prefix = 0;

    this.getId = function () {
        return this.id;
    };

    this.getName = function () {
        return this.phrase_text;
    };

    this.hasStates = function () {
        return this.has_states;
    }
};

module.exports = Country;

