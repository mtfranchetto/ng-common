"use strict";

var HttpClient = function () {
};

HttpClient.prototype.get = function (url, parser) { };
HttpClient.prototype.post = function (url, data, parser) { };
HttpClient.prototype.put = function (url, data, parser) { };
HttpClient.prototype.delete = function (url, parser) { };
HttpClient.prototype.jsonp = function (url, parser) { };

module.exports = HttpClient;