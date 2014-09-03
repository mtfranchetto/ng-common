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
    if (tag)
        this.timestamps[tag] = getCurrentTimestamp();
};

MemCache.prototype.getData = function (tag) {
    if (!tag)
        return null;
    if (getCurrentTimestamp() - this.timestamps[tag] < this.expireTime)
        return this.cache[tag];
    return null;
};

MemCache.prototype.expire = function (tag) {
    if (tag) {
        this.cache[tag] = null;
        this.timestamps[tag] = null;
    }
};

MemCache.prototype.expireAll = function () {
    this.cache = [];
    this.timestamps = [];
};


MemCache.prototype.setExpireTime = function (milliseconds) {
    this.expireTime = milliseconds;
};

function getCurrentTimestamp() {
    return Date.now();
}

module.exports = MemCache;