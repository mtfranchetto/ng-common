'use strict';

var _ = require('lodash');

describe('Strict gson', function () {

    var Gson = require('../lib/io/StrictGson'),
        TestModel = require('./data/TestModel'),
        Country = require('./data/Country');


    it('should return a test model object', function () {
        var gson = new Gson(),
            json = {
                user: "john",
                password: "doe",
                others :[],
                testModel : {},
                "foo": "foo"
            };

        var obj = gson.deserialize(json, TestModel);
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
        expect(obj.getFoo()).toEqual("foo");
        expect(obj instanceof TestModel).toBeTruthy();
    });

});
