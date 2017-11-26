# extend-assign
Extend Object.assgin(),it can support filter, deep copy, protect property.

## Install

```
npm i extend-assign --save

```

## Examples

Copy the values of all enumerable properties from source objects to a target object

```
const assign = require('extend-assign');
assign({c: 3}, {a: 1, b: 2});

// {a:1, b: 2, c: 3}
```


Deep copy

```
const assign = require('extend-assign');
assign({a: {c: 3}}, {a: {a: 1, b: 2}}, true);

// {a: { a: 1, b: 2, c: 3}}

```

Filter you specify propertites from source objects

```
const assign = require('extend-assign')
assign({c: 3}, {a: 1, b: 2}, false, {
    filter: ['a', 'c']
});

// {b: 2, c: 3}


assign({a: {c: 3}}, {a: {a: 1, b: 2}}, true, {
    filter: ['a.a']
});
// {a: { b: 2, c: 3}}


assign({a: {c: 3}}, {a: {a: 1, b: 2}, b: 2}, true, {
    filter: ['b'],
    filterGlobal: true
});
// {a: { a: 1, c: 3}}

assign({a: {c: 3}}, {a: {a: 1, 'a.b': 2, b: 2}, b: 2}, true, {
    filter: ['a.b'],
    filterGlobal: true
});

// {a: { a: 1, b: 2, c: 3, b: 2}}

```

Protect you specify propertites from source objects, protected propertites aren't writable and enumerable

```
const assign = require('extend-assign')
 function Person(name) {
    assign(this, {name},true, {
        protect: ['name']
    });
 }
 let A = new Person('A');
 A.name = 'B';
 console.log(A.name); 'A'

```

## API

### assgin(target[,...sources][,deep, option])

- target <object>
target object

- sources <array> An array of source objects.

- deep <boolean> When true, the copy is deep copy; Default: false

- options <object>
  - filter <array>|<function>
    -  <array> An array of propertites will be filtered.
    - <function> a custom filter function, the function has an argument(key), when the function return false, will filter the key.
  - filterGlobal <boolean>

      When true,for example, 'xxx.xx' will be regarded as a key; Default: false.
  - protect <array>|<function>
     -  <array> An array of propertites will be protected.
     - <function> a custom filter function, the function has an argument(key), when the function return false, will protect the key.
  - protectGlobal

      When true,for example, 'xxx.xx' will be regarded as a key; Default: false.
## test

```
npm run test
```

