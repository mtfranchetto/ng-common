"use strict";

var RequestHandler = require('./RequestHandler'),
    Parser = require('./Parser'),
    Methods = require('./Methods'),
    UrlNormalizer = require('./UrlNormalizer'),
    inherits = require('inherits'),
    HttpClient = require('./HttpClient');

var BaseHttpClient = function (httpService) {
    this._http = httpService;

    this._handleRequest = function (url, method, data, requestHandler, parser) {
        requestHandler = requestHandler || RequestHandler;
        parser = parser || Parser;
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

inherits(BaseHttpClient, HttpClient);

BaseHttpClient.prototype.get = function (url, requestHandler, parser) {
    this._handleRequest(url, Methods.GET, requestHandler, parser);
};

BaseHttpClient.prototype.post = function (url, data, requestHandler, parser) {
    this._handleRequest(url, Methods.POST, data, requestHandler, parser);
};

BaseHttpClient.prototype.put = function (url, data, requestHandler, parser) {
    this._handleRequest(url, Methods.PUT, data, requestHandler, parser);
};

BaseHttpClient.prototype.delete = function (url, requestHandler, parser) {
    this._handleRequest(url, Methods.DELETE, requestHandler, parser);
};

BaseHttpClient.prototype.jsonp = function (url, requestHandler, parser) {
    url = UrlNormalizer.normalizeJsonp(url);
    this._handleRequest(url, Methods.JSONP, requestHandler, parser);
};

module.exports = BaseHttpClient;