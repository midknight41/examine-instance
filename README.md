
# examine-instance

[![Greenkeeper badge](https://badges.greenkeeper.io/midknight41/examine-instance.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/midknight41/examine-instance.svg?branch=master)](https://travis-ci.org/midknight41/examine-instance) 

**examine-instance** inspects an object and its prototype and catalogues the properties and methods.

## Installation

```
npm install examine-instance -S
```

## Usage

```js

import examine from "examine-instance";

class MyClass {

  constructor() {
    this._property1 = "";
    this._isGood = true;
  }

  get isGood() { return this._isGood; }
  get property1() { return this._property1; }
  set property1(value) { this._property1 = value; }

  method1(value) {
    return value;
  }
}

const instance = new MyClass();
const result = examine(instance);

/*
{ 
  methods: [ 'method1' ],
  attributes: [ '_property1', '_isGood' ],
  readOnly: [ 'isGood' ],
  readWrite: [ 'property1' ],
  writeOnly: []
}

*/
```
