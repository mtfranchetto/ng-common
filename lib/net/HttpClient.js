"use strict";

var Cache = require('./Cache'),
    RequestHandler = require('./RequestHandler'),
    Parser = require('./Parser'),
    Methods = require('./Methods');

var HttpClient = function ($http, cache) {
    this._http = $http;
    this._cache = cache || Cache;

    this._handleRequest = function (url, method, data, requestHandler, parser) {
        requestHandler = requestHandler || RequestHandler;
        parser = parser ||  Parser;
        if (method === Methods.GET || method === Methods.JSONP) {
            if (this._cache.getData(url))
                return requestHandler.success(this._cache.getData(url));
        }
        getPromise(url, method, data).success(function (response) {
            var parsedResponse = parser.parse(response);
            if (parsedResponse)
                requestHandler.success(parsedResponse);
            else
                requestHandler.error(response);
        }, requestHandler.error);
    };

    var getPromise = function (url, method, data) {
        switch (method) {
            case Methods.GET:
                return this._http.get(url);
            case Methods.POST:
                return this._http.post(url, data);
            case Methods.PUT:
                return this._http.put(url, data);
            case Methods.DELETE:
                return this._http.delete(url);
            case Methods.JSONP:
                return this._http.jsonp(url);
        }
    };
};

HttpClient.prototype.get = function (url, requestHandler, parser) {
    this._handleRequest(url, Methods.GET, requestHandler, parser);
};

HttpClient.prototype.post = function (url, data, requestHandler, parser) {
    this._handleRequest(url, Methods.POST, data, requestHandler, parser);
};

HttpClient.prototype.put = function (url, data, requestHandler, parser) {
    this._handleRequest(url, Methods.PUT, data, requestHandler, parser);
};

HttpClient.prototype.delete = function (url, requestHandler, parser) {
    this._handleRequest(url, Methods.DELETE, requestHandler, parser);
};

HttpClient.prototype.jsonp = function (url, requestHandler, parser) {
    if (url.indexOf("?") === -1)
        url += "?";
    else if (url.indexOf("&") > -1)
        url += "&";
    url += "callback=JSON_CALLBACK";
    this._handleRequest(url, Methods.JSONP, requestHandler, parser);
};

module.exports = HttpClient;