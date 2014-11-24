"use strict";

var Parser = require('./Parser'),
    Methods = require('./Methods'),
    UrlNormalizer = require('./UrlNormalizer'),
    inherits = require('inherits'),
    HttpClient = require('./HttpClient'),
    Promise = require('bluebird'),
    _ = require('lodash');

var BaseHttpClient = function (http) {
    this._http = http;
};

inherits(BaseHttpClient, HttpClient);

BaseHttpClient.prototype._getNetworkPromise = function (url, method, data, headers) {
    switch (method) {
        case Methods.GET:
            return this._http.get(url, {headers: headers});
        case Methods.POST:
            return this._http.post(url, data, {headers: headers});
        case Methods.PUT:
            return this._http.put(url, data, {headers: headers});
        case Methods.DELETE:
            return this._http.delete(url, {headers: headers});
        case Methods.JSONP:
            return this._http.jsonp(url, {headers: headers});
    }
};

BaseHttpClient.prototype._handleRequest = function (url, method, data, parser, headers) {
    return new Promise(_.bind(function (resolve, reject) {
        parser = parser || new Parser();
        var unwrapResponse = this.unwrapResponse();
        this._getNetworkPromise(url, method, data, headers)
            .success(function (response, status, headers, config) {
                if (!unwrapResponse)
                    resolve(parser.parse(response));
                else
                    resolve([parser.parse(response), status, headers, config]);
            })
            .error(function (error, status, headers, config) {
                if (!unwrapResponse)
                    reject(error);
                else
                    reject({data: error, status: status, headers: headers, config: config});
            });
    }, this));
};

BaseHttpClient.prototype.unwrapResponse = function () {
    return false;
};

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
