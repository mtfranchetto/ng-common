"use strict";

var angular = require('angular'),
    _ = require('underscore'),
    ProviderTypes = require('./angular/ProviderTypes');

var BaseBootstrapper = function () {

    var dependencies = {},
        module = null;

    this.register = function (name, providerType, value) {
        dependencies[name] = { providerType: providerType, value: value };
    };

    this.run = function (name, moduleDependencies) {
        module = angular.module(name, moduleDependencies);
        _.each(dependencies, _registerDependency);
    };

    var _registerDependency = function (dependency, name) {
        if (dependency == null)
            return module;
        switch (dependency.providerType) {
            case ProviderTypes.CONFIG:
                return module.config(dependency.value);
            case ProviderTypes.CONSTANT:
                return module.constant(name, dependency.value);
            case ProviderTypes.CONTROLLER:
                return module.controller(name, dependency.value);
            case ProviderTypes.DIRECTIVE:
                return module.directive(name, dependency.value);
            case ProviderTypes.FACTORY:
                return module.factory(name, dependency.value);
            case ProviderTypes.RUN:
                return module.run(dependency.value);
            case ProviderTypes.SERVICE:
                return module.service(name, dependency.value);
            case ProviderTypes.VALUE:
                return module.value(name, dependency.value);
            case ProviderTypes.FILTER:
                return module.filter(name, dependency.value);
        }
    };
};

module.exports = BaseBootstrapper;