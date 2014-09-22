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
                return module.config(name); //config does not accept names, just block functions
            case ProviderTypes.CONSTANT:
                return module.constant(name, dependency);
            case ProviderTypes.CONTROLLER:
                return module.controller(name, dependency);
            case ProviderTypes.DIRECTIVE:
                return module.directive(name, dependency);
            case ProviderTypes.FACTORY:
                return module.factory(name, dependency);
            case ProviderTypes.RUN:
                return module.run(name); //run does not accept names, just block functions
            case ProviderTypes.SERVICE:
                return module.service(name, dependency);
            case ProviderTypes.VALUE:
                return module.value(name, dependency);
            case ProviderTypes.FILTER:
                return module.filter(name, dependency);
        }
    };
};

module.exports = BaseBootstrapper;