// Testing Framework
import * as Code from "@hapi/code";
import * as Lab from "@hapi/lab";
import getHelper from "lab-testing";

import examine from "../lib/index";

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const helper = getHelper(lab);

const group = helper.createExperiment("Examine");


class RW {

  get prop1() { return this.internal; }
  set prop1(value) { this.internal = value; }

  get prop2() { return this.internal; }
  set prop2(value) { this.internal = value; }

  get prop3() { return this.internal; }
  set prop3(value) { this.internal = value; }

}

class RO {

  get prop1() { return this.internal; }
  get prop2() { return this.internal; }
  get prop3() { return this.internal; }

}

class WO {

  set prop1(value) { this.internal = value; }
  set prop2(value) { this.internal = value; }
  set prop3(value) { this.internal = value; }

}

class Public {

  constructor() {

    this.prop1 = "a";
    this.prop2 = "b";
    this.prop3 = "c";
  }

}

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

  method2_(value) {
    return value;
  }
}

group("The examine() function", () => {

  lab.test("can detect a method on the instance of the object", () => {

    const obj = {
      method1: () => { return; },
      method2_: () => { return; },
      _method3: () => { return; }
    };

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.methods).to.have.length(3);
    expect(result.methods).to.contain(["method1", "method2_", "_method3"]);


  });

  lab.test("can detect a private method on the instance of the object", () => {

    const obj = {
      method1_: () => { return; },
      _method2: () => { return; }
    };

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.privateMethods).to.have.length(2);
    expect(result.privateMethods).to.contain(["method1_", "_method2"]);


  });

  lab.test("can detect a public method on the instance of the object", () => {

    const obj = {
      method1: () => { return; },
      method2: () => { return; }
    };

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.publicMethods).to.have.length(2);
    expect(result.publicMethods).to.contain(["method1", "method2"]);


  });

  lab.test("can detect a variable on the instance of the object", () => {

    const obj = {
      att1: "a",
      att2: "b",
      att3: "c"
    };

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.attributes).to.have.length(3);
    expect(result.attributes).to.contain(["att1", "att2", "att3"]);
  });

  lab.test("can detect a method on the prototype of the object", () => {

    const Class = (function () {
      function MyClass() {
        return;
      }

      MyClass.prototype.method1 = function () { return; };
      MyClass.prototype.method2 = function () { return; };
      MyClass.prototype.method3 = function () { return; };

      return MyClass;
    }());

    const obj = new Class();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.methods).to.have.length(3);
    expect(result.methods).to.contain(["method1", "method2", "method3"]);
  });

  lab.test("can detect a private method on the instance of the class", () => {

    const obj = new MyClass();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.privateMethods).to.have.length(1);
    expect(result.privateMethods).to.contain(["method2_"]);
  });

  lab.test("can detect a public method on the instance of the class", () => {

    const obj = new MyClass();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.publicMethods).to.have.length(1);
    expect(result.publicMethods).to.contain(["method1"]);
  });

  lab.test("can detect a raw attribute on the prototype of the object", () => {

    const Class = (function () {
      function MyClass() {
        return;
      }

      MyClass.prototype.att1 = "a";
      MyClass.prototype.att2 = "b";
      MyClass.prototype.att3 = "c";

      return MyClass;
    }());

    const obj = new Class();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.attributes).to.have.length(3);
    expect(result.attributes).to.contain(["att1", "att2", "att3"]);
  });

  lab.test("can detect a R/W property on a class", () => {

    const obj = new RW();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.readWrite).to.have.length(3);
    expect(result.readWrite).to.contain(["prop1", "prop2", "prop3"]);
  });

  lab.test("can detect public variables on a class", () => {

    const obj = new Public();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.attributes).to.have.length(3);
    expect(result.attributes).to.contain(["prop1", "prop2", "prop3"]);
  });


  lab.test("can detect a R/O property on a class", () => {

    const obj = new RO();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.readOnly).to.have.length(3);
    expect(result.readOnly).to.contain(["prop1", "prop2", "prop3"]);
  });

  lab.test("can detect a W/O property on a class", () => {

    const obj = new WO();

    const result = examine(obj);

    expect(result).to.be.an.object();
    expect(result.writeOnly).to.have.length(3);
    expect(result.writeOnly).to.contain(["prop1", "prop2", "prop3"]);
  });

  lab.test("can run the example", () => {

    const obj = new MyClass();

    const result = examine(obj);

    expect(result).to.be.an.object();
  });

});
