"use strict";

module.exports = {
    inherits: require('inherits'),
    BaseBootstrapper: require('./lib/BaseBootstrapper'),
    BaseExecutor: require('./lib/BaseExecutor'),
    ValueHolder: require('./lib/ValueHolder'),
    ConsoleLogger: require('./lib/ConsoleLogger'),
    Logger: require('./lib/Logger'),
    DataRetriever: require('./lib/DataRetriever'),
    Watcher: require('./lib/Watcher'),
    io: {
        Gson: require('./lib/io/Gson'),
        StrictGson: require('./lib/io/StrictGson'),
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
        StrictGsonParser: require('./lib/net/StrictGsonParser'),
        Parser: require('./lib/net/Parser'),
        Methods: require('./lib/net/Methods'),
        QueryStringSerializer: require('./lib/net/QueryStringSerializer'),
        WorkerHttpClient: require('./lib/net/WorkerHttpClient')
    },
    angular: {
        ScopeInvoker: require('./lib/angular/ScopeInvoker'),
        ProviderTypes: require('./lib/angular/ProviderTypes'),
        DirectiveCreator: require('./lib/angular/DirectiveCreator'),
        AngularUtil: require('./lib/angular/AngularUtil'),
        "NavigationChangeWatcher": require('./lib/angular/NavigationChangeWatcher')
    }
};
