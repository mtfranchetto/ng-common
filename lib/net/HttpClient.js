"use strict";

var HttpClient = function () {
};

HttpClient.prototype.get = function (url, requestHandler, parser) { };
HttpClient.prototype.post = function (url, data, requestHandler, parser) { };
HttpClient.prototype.put = function (url, data, requestHandler, parser) { };
HttpClient.prototype.delete = function (url, requestHandler, parser) { };
HttpClient.prototype.jsonp = function (url, requestHandler, parser) { };

module.exports = HttpClient;