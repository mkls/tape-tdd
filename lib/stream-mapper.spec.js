'use strict';

var test = require('tape');

var streamMapper = require('./stream-mapper');

test('assertMapper', function (t) {
    var input = {
        'id': 0,
        'ok': false,
        'name': 'assert name',
        'operator': 'equal',
        'actual': 1,
        'expected': 2,
        'error': {
            stack: 'Error: should be equal\n                at Test.bound [as _assert] (C:\\Workings\\tape-tdd\\node_modules\\tape\\lib\\test.js:66:32)\n                at Q.Promise.then.d (C:\\Workings\\tape-tdd\\fixtures\\promise.spec.js:14:11)\n                at _fulfilled (C:\\Workings\\tape-tdd\\node_modules\\q\\q.js:834:54)\n                at self.promiseDispatch.done (C:\\Workings\\tape-tdd\\node_modules\\q\\q.js:863:30)\n                at C:\\Workings\\tape-tdd\\node_modules\\q\\q.js:604:44'
        },
        'file': 'C:\\Workings\\tape-tdd\\fixtures\\promise.spec.js:14:11',
        'at': 'at Q.Promise.then.d (C:\\Workings\\tape-tdd\\fixtures\\promise.spec.js:14:11)',
        'test': 2,
        'type': 'assert'
    };
    var testNames = {
        '2': ['A', 'B']
    };
    var dirname = 'C:\\Workings\\tape-tdd';

    var expected = {
        ok: false,
        name: ['A', 'B', 'assert name'],
        operator: 'equal',
        actual: 1,
        expected: 2,
        at: 'fixtures\\promise.spec.js:14:11'
    };

    t.deepEqual(streamMapper.assertMapper(dirname, testNames, input), expected);

    t.end();
});

test('nonDefaultAssertionName', function (t) {
    var getName = streamMapper.nonDefaultAssertionName;

    t.equal(getName('valami', 'unknown operator'), 'valami');
    t.equal(getName('should be falsy', 'notOk'), undefined);
    t.equal(getName('etwas', 'ok'), 'etwas');
    t.equal(getName('should not throw', 'throws'), undefined);
    t.equal(getName('something', 'throws'), 'something');
    t.end();
});

test('test name mapper', function (t) {
    t.test('initial one', function (t) {
        var testNames = {};
        var test = {
            id: 0,
            name: 'asdf'
        };

        t.deepEqual(streamMapper.getTestName(test, testNames), ['asdf']);
        t.end();
    });

    t.test('parent test before', function (t) {
        var testNames = {
            '0': ['asdf'],
            'lastTest': ['asdf']
        };
        var test = {
            id: 1,
            parent: 0,
            name: 'qwer'
        };

        t.deepEqual(streamMapper.getTestName(test, testNames), ['asdf', 'qwer']);
        t.end();
    });
});