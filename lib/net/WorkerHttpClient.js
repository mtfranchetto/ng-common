"use strict";

var inherits = require('inherits'),
    BaseHttpClient = require('./BaseHttpClient'),
    Methods = require('./Methods'),
    Parser = require('./Parser'),
    Promise = require('bluebird');

var WorkerHttpClient = function (http) {
    BaseHttpClient.call(this, http);
};

inherits(WorkerHttpClient, BaseHttpClient);

WorkerHttpClient.prototype.get = function (url, parser, headers) {
    return this._handleRequest(url, Methods.GET, null, null, headers, true)
        .bind(this)
        .then(function (response) {
            var worker = new Worker('./../net/ParseWorker');
            worker.postMessage({
                data: response
            });
            return new Promise(function (resolve) {
                worker.addEventListener('message', function (message) {
                    resolve(message.data);
                });
            });
        })
        .then(function (message) {
            parser = parser || new Parser();
            return parser.parse(message.result);
        });
};

module.exports = WorkerHttpClient;