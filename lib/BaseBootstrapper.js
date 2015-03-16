"use strict";

var angular = require('angular'),
    _ = require('lodash'),
    ProviderTypes = require('./angular/ProviderTypes');

var BaseBootstrapper = function () {

    var dependencies = {},
        module = null;

    this.register = function (name, providerType, value) {
        dependencies[name] = {providerType: providerType, value: value};
    };

    this.config = function (name, value) {
        this.register(name, ProviderTypes.CONFIG, value);
    };

    this.provider = function (name, value) {
        this.register(name, ProviderTypes.PROVIDER, value);
    };

    this.constant = function (name, value) {
        this.register(name, ProviderTypes.CONSTANT, value);
    };

    this.controller = function (name, value) {
        this.register(name, ProviderTypes.CONTROLLER, value);
    };

    this.viewmodel = function (name, value) {
        this.controller(name, value);
    };

    this.directive = function (name, value) {
        this.register(name, ProviderTypes.DIRECTIVE, value);
    };

    this.factory = function (name, value) {
        this.register(name, ProviderTypes.FACTORY, value);
    };

    this.filter = function (name, value) {
        this.register(name, ProviderTypes.FILTER, value);
    };

    this.run = function (name, value) {
        this.register(name, ProviderTypes.RUN, value);
    };

    this.service = function (name, value) {
        this.register(name, ProviderTypes.SERVICE, value);
    };

    this.value = function (name, value) {
        this.register(name, ProviderTypes.VALUE, value);
    };

    this.bootstrap = function (name, moduleDependencies) {
        module = angular.module(name, moduleDependencies);
        _.forEach(dependencies, _registerDependency);
    };

    var _registerDependency = function (dependency, name) {
        if (dependency == null)
            return module;
        switch (dependency.providerType) {
            case ProviderTypes.CONFIG:
                return module.config(dependency.value);
            case ProviderTypes.PROVIDER:
                return module.provider(dependency.value);
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