'use strict'
/*
  This file is a reduced and adapted version of the main lib/internal/per_context/primordials.js file defined at

  https://github.com/nodejs/node/blob/master/lib/internal/per_context/primordials.js

  Don't try to replace with the original file and keep it up to date with the upstream file.
*/


export function ArrayIsArray(self) {
  return Array.isArray(self)
}

export function ArrayPrototypeIncludes(self, el) {
  return self.includes(el)
}

export function ArrayPrototypeIndexOf(self, el) {
  return self.indexOf(el)
}

export function ArrayPrototypeJoin(self, sep) {
  return self.join(sep)
}

export function ArrayPrototypeMap(self, fn) {
  return self.map(fn)
}

export function ArrayPrototypePop(self, el) {
  return self.pop(el)
}

export function ArrayPrototypePush(self, el) {
  return self.push(el)
}

export function ArrayPrototypeSlice(self, start, end) {
  return self.slice(start, end)
}

export const Error = Error;

export function FunctionPrototypeCall(fn, thisArgs, ...args) {
  return fn.call(thisArgs, ...args)
}

export function FunctionPrototypeSymbolHasInstance(self, instance) {
  return Function.prototype[Symbol.hasInstance].call(self, instance)
}

export const MathFloor = globalThis.Math.floor;
export const Number = globalThis.Number;
export const NumberIsInteger = globalThis.Number.isInteger;
export const NumberIsNaN = globalThis.Number.isNaN;
export const NumberMAX_SAFE_INTEGER = globalThis.Number.MAX_SAFE_INTEGER;
export const NumberMIN_SAFE_INTEGER = globalThis.Number.MIN_SAFE_INTEGER;
export const NumberParseInt = globalThis.Number.parseInt;

export function ObjectDefineProperties(self, props) {
  return Object.defineProperties(self, props)
}

export function ObjectDefineProperty(self, name, prop) {
  return Object.defineProperty(self, name, prop)
}

export function ObjectGetOwnPropertyDescriptor(self, name) {
  return Object.getOwnPropertyDescriptor(self, name)
}

export function ObjectKeys(obj) {
  return Object.keys(obj)
}

export function ObjectSetPrototypeOf(target, proto) {
  return Object.setPrototypeOf(target, proto)
}

export const Promise = Promise;

export function PromisePrototypeCatch(self, fn) {
  return self.catch(fn)
}

export function PromisePrototypeThen(self, thenFn, catchFn) {
  return self.then(thenFn, catchFn)
}

export function PromiseReject(err) {
  return Promise.reject(err)
}

export const ReflectApply = Reflect.apply;

export function RegExpPrototypeTest(self, value) {
  return self.test(value)
}

export const SafeSet = globalThis.Set;

export const String = globalThis.String;

export function StringPrototypeSlice(self, start, end) {
  return self.slice(start, end)
}

export function StringPrototypeToLowerCase(self) {
  return self.toLowerCase()
}

export function StringPrototypeToUpperCase(self) {
  return self.toUpperCase()
}

export function StringPrototypeTrim(self) {
  return self.trim()
}

export const Symbol = globalThis.Symbol; 
export const SymbolAsyncIterator = Symbol.asyncIterator;
export const SymbolHasInstance = Symbol.hasInstance;
export const SymbolIterator = Symbol.iterator;

export function TypedArrayPrototypeSet(self, buf, len) {
  return self.set(buf, len)
}

export const Uint8Array = globalThis.Uint8Array;

export const ObjectPrototypeHasOwnProperty = Object.hasOwn;