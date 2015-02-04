"use strict";

var _ = require('lodash');

describe('Query string serializer', function () {

    var QueryStringSerializer = require('../lib/net/QueryStringSerializer'),
        queryStringSerializer = new QueryStringSerializer();

    it('should deserialize a correct query string', function () {
        var queryString = 'test=10&foo=bar',
            data = queryStringSerializer.deserialize(queryString);

        expect(data.test).toEqual('10');
        expect(data.foo).toEqual("bar");
    });

    it("should deserialize a void query string", function () {
        var queryString = '',
            data = queryStringSerializer.deserialize(queryString);

        expect(data).toEqual({});
    });

    it("should serialize correctly an object", function () {
        var obj = {
            "test": 10,
            "foo": "bar"
        };
        expect(queryStringSerializer.serialize(obj)).toEqual("test=10&foo=bar");
    });
});