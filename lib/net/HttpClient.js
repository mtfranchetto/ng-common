"use strict";

var HttpClient = function () {
};

HttpClient.prototype.get = function (url, parser, headers) { };
HttpClient.prototype.post = function (url, data, parser, headers) { };
HttpClient.prototype.put = function (url, data, parser, headers) { };
HttpClient.prototype.delete = function (url, parser, headers) { };
HttpClient.prototype.jsonp = function (url, parser, headers) { };
HttpClient.prototype.multipart = function (url, data, parser, headers) { };

module.exports = HttpClient;