"use strict";

module.exports = {
    inherits: require('inherits'),
    BaseBootstrapper: require('./lib/BaseBootstrapper'),
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
        CacheProvider: require('./lib/net/CacheProvider'),
        MemCacheProvider: require('./lib/net/MemCacheProvider'),
        BaseHttpClient: require('./lib/net/BaseHttpClient'),
        MemCacheHttpClient: require('./lib/net/MemCacheHttpClient'),
        HttpClient: require('./lib/net/HttpClient'),
        GsonParser: require('./lib/net/GsonParser'),
        Parser: require('./lib/net/Parser'),
        RequestHandler: require('./lib/net/RequestHandler')
    },
    angular: {
        ScopeInvoker: require('./lib/angular/ScopeInvoker'),
        ProviderTypes: require('./lib/angular/ProviderTypes')
    }

};
