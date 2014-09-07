'use strict';

describe('GSON', function () {

    var Gson = require('../lib/io/Gson'),
        TestModel = require('./data/TestModel');

    it('should return a test model object', function () {
        var gson = new Gson(),
            json = {
                user: "john",
                password: "doe"
            };

        var obj = gson.deserialize(json, TestModel);
        expect(obj._user).toEqual("john");
        expect(obj._password).toEqual("doe");
        expect(obj instanceof TestModel).toBeTruthy();
    });

    it('should return an object with a TestModel array', function () {
        var gson = new Gson([TestModel]),
            json = {
                "user": "john",
                "password": "doe",
                "others": [
                    {
                        "user": "foo",
                        "password": "bar"
                    }
                ]
            };

        var obj = gson.deserialize(json, TestModel);
        expect(obj._user).toEqual("john");
        expect(obj._password).toEqual("doe");
        expect(obj._others[0]._user).toEqual("foo");
        expect(obj._others[0]._password).toEqual("bar");
        expect(obj instanceof TestModel).toBeTruthy();
    });

    it('should return an object with a TestModel array nested', function () {
        var gson = new Gson([TestModel]),
            json = {
                "user": "john",
                "password": "doe",
                "others": [
                    {
                        "user": "foo",
                        "password": "bar",
                        "others": [
                            {
                                "user": "test",
                                "password": "test"
                            }
                        ]
                    }
                ]
            };

        var obj = gson.deserialize(json, TestModel);
        expect(obj._user).toEqual("john");
        expect(obj._password).toEqual("doe");
        expect(obj._others[0]._user).toEqual("foo");
        expect(obj._others[0]._password).toEqual("bar");
        expect(obj._others[0]._others[0]._user).toEqual("test");
        expect(obj._others[0]._others[0]._password).toEqual("test");
        expect(obj instanceof TestModel).toBeTruthy();
    });

    it('should return an object with a TestModel object property', function () {
        var gson = new Gson([TestModel]),
            json = {
                "user": "john",
                "password": "doe",
                "testModel": {
                    "user": "foo",
                    "password": "bar"
                }
            };

        var obj = gson.deserialize(json, TestModel);
        expect(obj._user).toEqual("john");
        expect(obj._password).toEqual("doe");
        expect(obj._testModel._user).toEqual("foo");
        expect(obj._testModel._password).toEqual("bar");
        expect(obj instanceof TestModel).toBeTruthy();
    });

    it('should return an empty instance of a TestModel if JSON is bad', function () {
        var gson = new Gson([TestModel]),
            json = "foobar";
        var obj = gson.deserialize(json, TestModel);
        expect(obj._user).toEqual("");
        expect(obj._password).toEqual("");
        expect(obj._others.length).toEqual(0);
        expect(obj instanceof TestModel).toBeTruthy();
    });

});