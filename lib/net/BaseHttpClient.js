"use strict";

var Parser = require('./Parser'),
    Methods = require('./Methods'),
    UrlNormalizer = require('./UrlNormalizer'),
    inherits = require('inherits'),
    HttpClient = require('./HttpClient'),
    Promise = require('bluebird');

var BaseHttpClient = function (httpService) {
    this._http = httpService;

    this._handleRequest = function (url, method, data, parser, headers) {
        return new Promise(function (resolve, reject) {
            parser = parser || new Parser();
            getNetworkPromise(url, method, data, headers)
                .success(function (response) {
                    resolve(parser.parse(response));
                })
                .error(function (error) {
                    reject(error);
                });
        });
    };

    var getNetworkPromise = function (url, method, data, headers) {
        switch (method) {
            case Methods.GET:
                return httpService.get(url, {headers: headers});
            case Methods.POST:
                return httpService.post(url, data, {headers: headers});
            case Methods.PUT:
                return httpService.put(url, data, {headers: headers});
            case Methods.DELETE:
                return httpService.delete(url, {headers: headers});
            case Methods.JSONP:
                return httpService.jsonp(url, {headers: headers});
        }
    };
};

inherits(BaseHttpClient, HttpClient);

BaseHttpClient.prototype.get = function (url, parser, headers) {
    return this._handleRequest(url, Methods.GET, null, parser, headers);
};

BaseHttpClient.prototype.post = function (url, data, parser, headers) {
    return this._handleRequest(url, Methods.POST, data, parser, headers);
};

BaseHttpClient.prototype.put = function (url, data, parser, headers) {
    return this._handleRequest(url, Methods.PUT, data, parser, headers);
};

BaseHttpClient.prototype.delete = function (url, parser, headers) {
    return this._handleRequest(url, Methods.DELETE, null, parser, headers);
};

BaseHttpClient.prototype.jsonp = function (url, parser, headers) {
    url = UrlNormalizer.normalizeJsonp(url);
    return this._handleRequest(url, Methods.JSONP, null, parser, headers);
};

module.exports = BaseHttpClient;
