"use strict";

var Methods = require('./Methods'),
    UrlNormalizer = require('./UrlNormalizer'),
    inherits = require('inherits'),
    HttpClient = require('./HttpClient');

var MemCacheHttpClient = function (httpClient, cacheProvider, q) {
    this._httpClient = httpClient;
    this._cacheProvider = cacheProvider;
    this._q = q;
};

inherits(MemCacheHttpClient, HttpClient);

MemCacheHttpClient.prototype.get = function (url, parser) {
    var cachePromise = getCachePromise(url);
    if (cachePromise) return cachePromise;
    return this._httpClient.get(url, requestHandler, parser);
};

MemCacheHttpClient.prototype.post = function (url, data, requestHandler, parser) {
    return this._httpClient.post(url, data, requestHandler, parser);
};

MemCacheHttpClient.prototype.put = function (url, data, requestHandler, parser) {
    return this._httpClient.put(url, data, requestHandler, parser);
};

MemCacheHttpClient.prototype.delete = function (url, requestHandler, parser) {
    return this._httpClient.delete(url, requestHandler, parser);
};

MemCacheHttpClient.prototype.jsonp = function (url, requestHandler, parser) {
    url = UrlNormalizer.normalizeJsonp(url);
    var cachePromise = getCachePromise(url);
    if (cachePromise) return cachePromise;
    return this._handleRequest(url, Methods.JSONP, requestHandler, parser);
};

var getCachePromise = function (url) {
    if (getCachedData(url) != null) {
        var deferred = this._q.defer();
        deferred.resolve(getCachedData(url));
        return deferred.promise;
    }
    return null;
};

var getCachedData = function (url) {
    return this._cacheProvider.getData(url);
};

module.exports = MemCacheHttpClient;