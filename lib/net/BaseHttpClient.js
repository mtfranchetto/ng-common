"use strict";

var Parser = require('./Parser'),
    Methods = require('./Methods'),
    UrlNormalizer = require('./UrlNormalizer'),
    inherits = require('inherits'),
    HttpClient = require('./HttpClient'),
    Promise = require('bluebird');

var BaseHttpClient = function (httpService) {
    this._http = httpService;

    this._handleRequest = function (url, method, data, parser) {
        return new Promise(function (resolve, reject) {
            parser = parser || new Parser();
            getNetworkPromise(url, method, data)
                .success(function (response) {
                    resolve(parser.parse(response));
                })
                .error(function (error) {
                    reject(error);
                });
        });
    };

    var getNetworkPromise = function (url, method, data) {
        switch (method) {
            case Methods.GET:
                return httpService.get(url);
            case Methods.POST:
                return httpService.post(url, data);
            case Methods.PUT:
                return httpService.put(url, data);
            case Methods.DELETE:
                return httpService.delete(url);
            case Methods.JSONP:
                return httpService.jsonp(url);
        }
    };
};

inherits(BaseHttpClient, HttpClient);

BaseHttpClient.prototype.get = function (url, parser) {
    return this._handleRequest(url, Methods.GET, null, parser);
};

BaseHttpClient.prototype.post = function (url, data, parser) {
    return this._handleRequest(url, Methods.POST, data, parser);
};

BaseHttpClient.prototype.put = function (url, data, parser) {
    return this._handleRequest(url, Methods.PUT, data, parser);
};

BaseHttpClient.prototype.delete = function (url, parser) {
    return this._handleRequest(url, Methods.DELETE, null, parser);
};

BaseHttpClient.prototype.jsonp = function (url, parser) {
    url = UrlNormalizer.normalizeJsonp(url);
    return this._handleRequest(url, Methods.JSONP, null, parser);
};

module.exports = BaseHttpClient;
