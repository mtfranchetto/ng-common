"use strict";

var UrlNormalizer = require('./UrlNormalizer'),
    inherits = require('inherits'),
    HttpClient = require('./HttpClient'),
    Promise = require('bluebird'),
    _ = require('lodash');

var MemCacheHttpClient = function (httpClient, cacheProvider) {
    this._httpClient = httpClient;
    this._cacheProvider = cacheProvider;
};

inherits(MemCacheHttpClient, HttpClient);

MemCacheHttpClient.prototype.get = function (url, parser, headers) {
    var cachePromise = this._getCachePromise(url);
    if (cachePromise) return cachePromise;
    return this._httpClient.get(url, parser, headers)
        .bind(this)
        .then(function (response) {
            this._cacheProvider.setData(url, response);
            return response;
        });
};

MemCacheHttpClient.prototype.post = function (url, data, parser, headers) {
    return this._httpClient.post(url, data, parser, headers);
};

MemCacheHttpClient.prototype.put = function (url, data, parser, headers) {
    return this._httpClient.put(url, data, parser, headers);
};

MemCacheHttpClient.prototype.delete = function (url, parser, headers) {
    return this._httpClient.delete(url, parser, headers);
};

MemCacheHttpClient.prototype.jsonp = function (url, parser, headers) {
    url = UrlNormalizer.normalizeJsonp(url);
    var cachePromise = this._getCachePromise(url);
    if (cachePromise) return cachePromise;
    return this._httpClient.jsonp(url, parser, headers)
        .bind(this)
        .then(function (response) {
            this._cacheProvider.setData(url, response);
            return response;
        });
};

MemCacheHttpClient.prototype.multipart = function (url, data, parser, headers) {
    return this._httpClient.multipart(url, data, parser, headers);
};

MemCacheHttpClient.prototype._getCachePromise = function (url) {
    if (this._getCachedData(url) != null) {
        return new Promise(_.bind(function (resolve, reject) {
            resolve(this._getCachedData(url));
        }, this));
    }
    return null;
};

MemCacheHttpClient.prototype._getCachedData = function (url) {
    return this._cacheProvider.getData(url);
};

module.exports = MemCacheHttpClient;
