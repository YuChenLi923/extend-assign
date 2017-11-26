const assign = require('extend-assign'),
      assert = require('assert');
describe('test assign', function() {
    it('copy', function() {
        const result = assign({c: 3}, {
            a: 1,
            b: 2
        });
        assert.deepEqual(result, {
            a: 1,
            b: 2,
            c: 3
        })
    });
    it('deep copy', function() {
        const result = assign({a: { c: 3}}, {
            a: {
                a: 1,
                b: 2
            }
        }, true);
        assert.deepEqual(result, {
            a: {
                a: 1,
                b: 2,
                c: 3
            }
        })
    });
});
describe('test filter', function() {
    it('filter', function () {
        const a = {
            a: 1,
            b: 2
        };
        const b = {
            s: 2,
            t: 5,
            m: {
                t:2
            }
        };
        const result = assign(a, b, true, {
            filter: ['s']
        });
        assert.deepEqual(result, {
            a: 1,
            b: 2,
            t: 5,
            m: {
                t:2
            }
        });
    });
    it('filter global', function () {
        const a = {
            a: 1,
            b: 2
        };
        const b = {
            s: 2,
            t: 5,
            m: {
                t:2
            }
        };
        const result = assign(a, b, true, {
            filter: ['t'],
            filterGlobal: true
        });
        assert.deepEqual(result, {
            a: 1,
            b: 2,
            s: 2,
            m: {}
        });
    });
    it('deep filter', function () {
        const a = {
            a: 1,
            b: 2
        };
        const b = {
            s: 2,
            t: 5,
            m: {
                t:2
            }
        };
        const result = assign(a, b, true, {
            filter: ['m.t']
        });
        assert.deepEqual(result, {
            s: 2,
            a: 1,
            b: 2,
            t: 5,
            m: {
            }
        });
    });
    it('custom filter', function() {
        const a = {
            b: 1,
            c: 2
        };
        const b = {
            a: 5,
            b: 8
        };
        const result = assign(a, b, true, {
            filter: (key) => {
                return key !== 'b'
            }
        });
        assert.deepEqual(result, {
            a: 5,
            c: 2,
            b: 1
        });
    });
});
describe('test protect', function () {
    it('protect property', function() {
        function Person(name) {
            assign(this, {
                name
            },true, {
                protect: ['name']
            });
        }
        let A = new Person('A');
        A.name = 1;
        assert.equal(A.name, 'A');
    });
});