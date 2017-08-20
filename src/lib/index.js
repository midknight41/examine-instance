export default function examine(target) {

  const examination = {
    methods: [],
    privateMethods: [],
    publicMethods: [],
    attributes: [],
    readOnly: [],
    readWrite: [],
    writeOnly: []
  };

  const propNames = Object.getOwnPropertyNames(target);
  const proto = Object.getPrototypeOf(target);
  const protoPropNames = Object.getOwnPropertyNames(proto);

  const privateNameExp = /^_|_$/;

  // examine the instance
  for (const value of propNames) {

    const exclude = ["hasOwnProperty"];

    const descriptor = Object.getOwnPropertyDescriptor(target, value);

    if (exclude.indexOf(value) > -1) {
      continue;
    }

    if (descriptor.value !== undefined && typeof descriptor.value === "function") {

      examination.methods.push(value);

      const isPrivateMethod = privateNameExp.exec(value);

      if (isPrivateMethod) {
        examination.privateMethods.push(value);
      } else {
        examination.publicMethods.push(value);
      }
      continue;
    }

    if (descriptor.value !== undefined && typeof descriptor.value !== "function") {

      examination.attributes.push(value);
      continue;
    }

    if (descriptor.set !== undefined && descriptor.get !== undefined) {
      examination.readWrite.push(value);
      continue;
    }

    if (descriptor.get !== undefined && descriptor.set === undefined) {
      examination.readOnly.push(value);
      continue;
    }

    if (descriptor.set !== undefined && descriptor.get === undefined) {
      examination.writeOnly.push(value);
      continue;
    }

  }

  // examine the prototype
  for (const value of protoPropNames) {

    const exclude = ["hasOwnProperty",
      "constructor",
      "toString",
      "toLocaleString",
      "valueOf",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "__defineGetter__",
      "__lookupGetter__",
      "__defineSetter__",
      "__lookupSetter__"];

    const descriptor = Object.getOwnPropertyDescriptor(proto, value);

    if (exclude.indexOf(value) > -1) {
      continue;
    }

    if (descriptor.value !== undefined && typeof descriptor.value === "function") {

      examination.methods.push(value);

      const isPrivateMethod = privateNameExp.exec(value);

      if (isPrivateMethod) {
        examination.privateMethods.push(value);
      } else {
        examination.publicMethods.push(value);
      }
      continue;
    }

    if (descriptor.value !== undefined && typeof descriptor.value !== "function") {

      examination.attributes.push(value);
      continue;
    }

    if (descriptor.set !== undefined && descriptor.get !== undefined) {
      examination.readWrite.push(value);
      continue;
    }

    if (descriptor.get !== undefined && descriptor.set === undefined) {
      examination.readOnly.push(value);
      continue;
    }

    if (descriptor.set !== undefined && descriptor.get === undefined) {
      examination.writeOnly.push(value);
      continue;
    }

  }

  return examination;
}
