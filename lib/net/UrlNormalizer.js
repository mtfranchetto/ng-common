"use strict";

var UrlNormalizer = new (function () {
    this.normalizeJsonp = function (url) {
        if (url.indexOf("?") === -1)
            url += "?";
        else if (url.indexOf("&") > -1)
            url += "&";
        if (url.indexOf("callback=JSON_CALLBACK") === -1)
            url += "callback=JSON_CALLBACK";
        return url;
    };
});

module.exports = UrlNormalizer;