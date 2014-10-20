"use strict";

var Cache = function () {

};

Cache.prototype.setData = function (tag, data) { };
Cache.prototype.getData = function (tag) {return null; };
Cache.prototype.setExpireTime = function (milliseconds) { };
Cache.prototype.expire = function (tag) { };
Cache.prototype.expireAll = function () { };

module.exports = Cache;
