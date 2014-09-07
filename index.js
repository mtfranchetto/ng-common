"use strict";

module.exports = {
    inherits: require('inherits'),
    BaseExecutor: require('./lib/BaseExecutor'),
    ValueHolder: require('./lib/ValueHolder'),
    ConsoleLogger: require('./lib/ConsoleLogger'),
    Logger: require('./lib/Logger'),
    io: {
        Gson: require('./lib/io/Gson'),
        JSONSerializer: require('./lib/io/JSONSerializer'),
        Serializer: require('./lib/io/Serializer'),
        SettingsManager: require('./lib/io/SettingsManager')
    },
    net: {
        Cache: require('./lib/net/Cache'),
        MemCache: require('./lib/net/MemCache'),
        HttpClient: require('./lib/net/HttpClient'),
        GsonParser: require('./lib/net/GsonParser'),
        Parser: require('./lib/net/Parser'),
        RequestHandler: require('./lib/net/RequestHandler')
    },
    angular: {
        ScopeInvoker: require('./lib/angular/ScopeInvoker')
    }

};
