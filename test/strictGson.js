'use strict';

var _ = require('lodash');

describe('Strict gson', function () {

    var Gson = require('../lib/io/StrictGson'),
        TestModel = require('./data/TestModel'),
        LittleTestModel = require('./data/LittleTestModel'),
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

    it('should return an object with a TestModel array', function () {
        var gson = new Gson(),
            json = {
                "user": "john",
                "password": "doe",
                "others": [
                    {
                        "user": "foo",
                        "password": "bar"
                    }
                ],
                "testModel": {}
            };

        var obj = gson.deserialize(json, [TestModel, LittleTestModel]);
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
        expect(obj.others[0].user).toEqual("foo");
        expect(obj.others[0].password).toEqual("bar");
        expect(obj instanceof TestModel).toBeTruthy();
        expect(obj.others[0] instanceof LittleTestModel).toBeTruthy();
    });

});
