'use strict'

import { Blob as _Blob } from 'buffer'

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
const Blob = globalThis.Blob || _Blob
/* eslint-disable indent */

export const isBlob =
  typeof Blob !== 'undefined'
    ? function isBlob(b) {
        // eslint-disable-next-line indent
        return b instanceof Blob
      }
    : function isBlob(b) {
        return false
      }
/* eslint-enable indent */
// This is a simplified version of AggregateError

export class AggregateError extends Error {
  constructor(errors) {
    if (!Array.isArray(errors)) {
      throw new TypeError(`Expected input to be an Array, got ${typeof errors}`)
    }

    let message = ''

    for (let i = 0; i < errors.length; i++) {
      message += `    ${errors[i].stack}\n`
    }

    super(message)
    this.name = 'AggregateError'
    this.errors = errors
  }
}

export const kEmptyObject = Object.freeze({});

export function once(callback) {
    let called = false
    return function (...args) {
      if (called) {
        return
      }

    called = true
    callback.apply(this, args)
  }
}

export const createDeferredPromise = function () {
  let resolve
  let reject // eslint-disable-next-line promise/param-names

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {
    promise,
    resolve,
    reject
  }
};

export function promisify(fn) {
  return new Promise((resolve, reject) => {
    fn((err, ...args) => {
      if (err) {
        return reject(err)
      }

      return resolve(...args)
    })
  })
}

promisify.custom = Symbol.for('nodejs.util.promisify.custom')

export function debuglog() {
  return function () {}
}

export function format(format, ...args) {
  // Simplified version of https://nodejs.org/api/util.html#utilformatformat-args
  return format.replace(/%([sdifj])/g, function (...[_unused, type]) {
    const replacement = args.shift()

    if (type === 'f') {
      return replacement.toFixed(6)
    } else if (type === 'j') {
      return JSON.stringify(replacement)
    } else if (type === 's' && typeof replacement === 'object') {
      const ctor = replacement.constructor !== Object ? replacement.constructor.name : ''
      return `${ctor} {}`.trim()
    } else {
      return replacement.toString()
    }
  })
}

export function inspect(value) {
  // Vastly simplified version of https://nodejs.org/api/util.html#utilinspectobject-options
  switch (typeof value) {
    case 'string':
      if (value.includes("'")) {
        if (!value.includes('"')) {
          return `"${value}"`
        } else if (!value.includes('`') && !value.includes('${')) {
          return `\`${value}\``
        }
      }

      return `'${value}'`

    case 'number':
      if (isNaN(value)) {
        return 'NaN'
      } else if (Object.is(value, -0)) {
        return String(value)
      }

      return value

    case 'bigint':
      return `${String(value)}n`

    case 'boolean':
    case 'undefined':
      return String(value)

    case 'object':
      return '{}'
  }
}

export const types = {
  isAsyncFunction(fn) {
    return fn instanceof AsyncFunction
  },

  isArrayBufferView(arr) {
    return ArrayBuffer.isView(arr)
  }
};
