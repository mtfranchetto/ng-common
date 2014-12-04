'use strict';

var _ = require('lodash');

describe('GSON', function () {

    var Gson = require('../lib/io/Gson'),
        TestModel = require('./data/TestModel'),
        Country = require('./data/Country');

    it('should return a test model object', function () {
        var gson = new Gson(),
            json = {
                user: "john",
                password: "doe"
            };

        var obj = gson.deserialize(json, TestModel);
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
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
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
        expect(obj.others[0].user).toEqual("foo");
        expect(obj.others[0].password).toEqual("bar");
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
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
        expect(obj.others[0].user).toEqual("foo");
        expect(obj.others[0].password).toEqual("bar");
        expect(obj.others[0].others[0].user).toEqual("test");
        expect(obj.others[0].others[0].password).toEqual("test");
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
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
        expect(obj.testModel.user).toEqual("foo");
        expect(obj.testModel.password).toEqual("bar");
        expect(obj instanceof TestModel).toBeTruthy();
    });

    it('should return an empty instance of a TestModel if JSON is bad', function () {
        var gson = new Gson([TestModel]),
            json = "foobar";
        var obj = gson.deserialize(json, TestModel);
        expect(obj.user).toEqual("");
        expect(obj.password).toEqual("");
        expect(obj.others.length).toEqual(0);
        expect(obj instanceof TestModel).toBeTruthy();
    });

    it('should deserialize/serialize/deserialize correctly', function () {
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
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
        expect(obj.testModel.user).toEqual("foo");
        expect(obj.testModel.password).toEqual("bar");
        expect(obj instanceof TestModel).toBeTruthy();

        json = gson.serialize(obj);
        expect(_.isString(json)).toBeTruthy();

        obj = gson.deserialize(json, TestModel);
        expect(obj.user).toEqual("john");
        expect(obj.password).toEqual("doe");
        expect(obj.testModel.user).toEqual("foo");
        expect(obj.testModel.password).toEqual("bar");
        expect(obj instanceof TestModel).toBeTruthy();
    });

    it('should deserialize correctly an array of data', function () {
        var gson = new Gson([Country]),
            json = [
                {
                    "id": 4,
                    "phrase_text": "Afghanistan",
                    "code": "AF",
                    "code3": "AFG",
                    "has_states": false,
                    "prefix": 93
                }
            ];

        var obj = gson.deserialize(json);
        expect(obj[0].getId()).toEqual(4);
        expect(obj[0].getName()).toEqual("Afghanistan");
        expect(obj[0].hasStates()).toBeFalsy();
    });

    it('should deserialize correctly a void array of data', function () {
        var gson = new Gson([Country]),
            json = [ ];

        var obj = gson.deserialize(json);
        expect(obj.length).toEqual(0);
    });

    it("should deserialize correctly a string array", function () {
        var model = require('./data/PaginationObject'),
            gson = new Gson([model]),
            json = require('./data/pagination.json');

        var obj = gson.deserialize(json);
        expect(obj.getEpcrs().fields).toEqual(["code","serialNumber"]);
    });

    it("should deserialize correctly a nested string array", function() {
        var model = require('./data/PaginationObject'),
            gson = new Gson([model]),
            json = require('./data/pagination.json');

        var obj = gson.deserialize(json);
        expect(obj.getEpcrs().pagination.sort).toEqual(["string","string2"]);
    });

});
