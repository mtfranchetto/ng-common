"use strict";

var CacheProvider = require('./CacheProvider'),
    inherits = require('inherits');

var MemCacheProvider = function () {
    this._cache = { };
    this._timestamps = { };
    this._expireTime = 1000 * 60 * 10;
};

inherits(MemCacheProvider, CacheProvider);

MemCacheProvider.prototype.setData = function (tag, data) {
    if (tag) {
        this._timestamps[tag] = getCurrentTimestamp();
        this._cache[tag] = data;
    }
};

MemCacheProvider.prototype.getData = function (tag) {
    if (!tag)
        return null;
    if (getCurrentTimestamp() - this._timestamps[tag] < this._expireTime)
        return this._cache[tag];
    return null;
};

MemCacheProvider.prototype.expire = function (tag) {
    if (tag) {
        this._cache[tag] = null;
        this._timestamps[tag] = null;
    }
};

MemCacheProvider.prototype.expireAll = function () {
    this._cache = [];
    this._timestamps = [];
};


MemCacheProvider.prototype.setExpireTime = function (milliseconds) {
    this._expireTime = milliseconds;
};

function getCurrentTimestamp() {
    return Date.now();
}

module.exports = MemCacheProvider;
