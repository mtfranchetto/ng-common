"use strict";

var DirectiveCreator = function () {
    this.create = function (Directive) {
        return function () {
            return construct(Directive, Array.prototype.slice.call(arguments));
        }
    };

    function construct(constructor, args) {
        function F() {
            return constructor.apply(this, args);
        }

        F.prototype = constructor.prototype;
        return new F();
    }
};

module.exports = DirectiveCreator;