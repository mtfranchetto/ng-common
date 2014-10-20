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
    var cachePromise = this._getCachePromise(url);
    if (cachePromise) return cachePromise;
    var deferred = this._q.defer(),
        self = this;
    this._httpClient.get(url, parser).then(function (response) {
        self._cacheProvider.setData(url, response);
        deferred.resolve(response);
    }, deferred.reject);
    return deferred.promise;
};

MemCacheHttpClient.prototype.post = function (url, data, parser) {
    return this._httpClient.post(url, data, parser);
};

MemCacheHttpClient.prototype.put = function (url, data, parser) {
    return this._httpClient.put(url, data, parser);
};

MemCacheHttpClient.prototype.delete = function (url, parser) {
    return this._httpClient.delete(url, parser);
};

MemCacheHttpClient.prototype.jsonp = function (url, parser) {
    url = UrlNormalizer.normalizeJsonp(url);
    var cachePromise = this._getCachePromise(url);
    if (cachePromise) return cachePromise;
    var deferred = this._q.defer(),
        self = this;
    this._httpClient.jsonp(url, parser).then(function (response) {
        self._cacheProvider.setData(url, response);
        deferred.resolve(response);
    }, deferred.reject);
    return deferred.promise;
};

MemCacheHttpClient.prototype._getCachePromise = function (url) {
    if (this._getCachedData(url) != null) {
        var deferred = this._q.defer();
        deferred.resolve(this._getCachedData(url));
        return deferred.promise;
    }
    return null;
};

MemCacheHttpClient.prototype._getCachedData = function (url) {
    return this._cacheProvider.getData(url);
};

module.exports = MemCacheHttpClient;
