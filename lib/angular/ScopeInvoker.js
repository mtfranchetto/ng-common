"use strict";

var ScopeInvoker = function () {

    this.invoke = function (scope, fn) {
        (scope.$$phase || scope.$root.$$phase) ? fn.apply(scope) : scope.$apply(function () {
            fn.apply(scope);
        });
    };
};

module.exports = ScopeInvoker;