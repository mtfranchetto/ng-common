"use strict";

var Cache = require('./Cache'),
    inherits = require('inherits');

var MemCache = function () {
    this._cache = { };
    this._timestamps = { };
    this._expireTime = 1000 * 60 * 10;
};

inherits(MemCache, Cache);

MemCache.prototype.setData = function (tag, data) {
    if (tag) {
        this._timestamps[tag] = getCurrentTimestamp();
        this._cache = data;
    }
};

MemCache.prototype.getData = function (tag) {
    if (!tag)
        return null;
    if (getCurrentTimestamp() - this._timestamps[tag] < this._expireTime)
        return this._cache[tag];
    return null;
};

MemCache.prototype.expire = function (tag) {
    if (tag) {
        this._cache[tag] = null;
        this._timestamps[tag] = null;
    }
};

MemCache.prototype.expireAll = function () {
    this._cache = [];
    this._timestamps = [];
};


MemCache.prototype.setExpireTime = function (milliseconds) {
    this._expireTime = milliseconds;
};

function getCurrentTimestamp() {
    return Date.now();
}

module.exports = MemCache;