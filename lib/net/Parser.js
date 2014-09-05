"use strict";

var Parser = function () {

};

Parser.prototype.parse = function (data) {
    //Subclasses must override this method
    return data;
};

module.exports = Parser;