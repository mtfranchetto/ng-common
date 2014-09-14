"use strict";

var Methods = require('./Methods'),
    UrlNormalizer = require('./UrlNormalizer'),
    inherits = require('inherits'),
    HttpClient = require('./HttpClient');

var MemCacheHttpClient = function (httpClient, cacheProvider) {
    this._httpClient = httpClient;
    this._cacheProvider = cacheProvider;
};

inherits(MemCacheHttpClient, HttpClient);

MemCacheHttpClient.prototype.get = function (url, requestHandler, parser) {
    if (getCachedData(url) != null)
        return requestHandler.success(getCachedData(url));
    this._httpClient.get(url, requestHandler, parser);
};

MemCacheHttpClient.prototype.post = function (url, data, requestHandler, parser) {
    this._httpClient.post(url, data, requestHandler, parser);
};

MemCacheHttpClient.prototype.put = function (url, data, requestHandler, parser) {
    this._httpClient.put(url, data, requestHandler, parser);
};

MemCacheHttpClient.prototype.delete = function (url, requestHandler, parser) {
    this._httpClient.delete(url, requestHandler, parser);
};

MemCacheHttpClient.prototype.jsonp = function (url, requestHandler, parser) {
    url = UrlNormalizer.normalizeJsonp(url);
    if (getCachedData(url) != null)
        return requestHandler.success(getCachedData(url));
    this._handleRequest(url, Methods.JSONP, requestHandler, parser);
};

var getCachedData = function (url) {
    return this._cacheProvider.getData(url);
}

module.exports = MemCacheHttpClient;