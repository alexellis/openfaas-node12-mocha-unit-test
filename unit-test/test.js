'use strict'

var expect = require('chai').expect

var handler = require('./handler')

describe('Tests', function() {
    it('answer to be 43', function() {
        var answer = 43;
        expect(answer).to.equal(43);
    });

    it('handles stuff', function() {
        let cb = (err, val) => {

        };
        let context = new FunctionContext(cb);
        handler(new FunctionEvent({body:""}), context)
        .then(()=>{
            expect(context.value).to.equal(201);
        })
        .catch(err => {
            console.log(err)
            expect(err).to.be.empty
        })
    });
});

class FunctionEvent {
    constructor(req) {
        this.body = req.body;
        this.headers = req.headers;
        this.method = req.method;
        this.query = req.query;
        this.path = req.path;
    }
}

class FunctionContext {
    constructor(cb) {
        this.value = 200;
        this.cb = cb;
        this.headerValues = {};
        this.cbCalled = 0;
    }

    status(value) {
        if(!value) {
            return this.value;
        }

        this.value = value;
        return this;
    }

    headers(value) {
        if(!value) {
            return this.headerValues;
        }

        this.headerValues = value;
        return this;    
    }

    succeed(value) {
        let err;
        this.cbCalled++;
        this.cb(err, value);
    }

    fail(value) {
        let message;
        this.cbCalled++;
        this.cb(value, message);
    }
}
