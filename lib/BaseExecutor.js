"use strict";

var BaseExecutor = function () {
    this._next = null;
};

BaseExecutor.prototype.execute = function (item) {
    if (!this.internalExecute(item) && this._next)
        this._next.execute(item);
};

BaseExecutor.prototype.internalExecute = function (item) {
    //Subclass must override this abstract method
};

BaseExecutor.prototype.setNext = function (executor) {
    this._next = executor;
};

module.exports = BaseExecutor;