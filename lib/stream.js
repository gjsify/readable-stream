// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict'

import { ObjectDefineProperty, ObjectKeys, ReflectApply } from './ours/primordials'

import * as util from './ours/util'
const {
  promisify: { custom: customPromisify }
} = util

import { streamReturningOperators, promiseReturningOperators } from './internal/streams/operators'

import errors from './ours/errors'
const {
  codes: { ERR_ILLEGAL_CONSTRUCTOR }
} = errors

import compose from './internal/streams/compose.js'

import { pipeline } from './internal/streams/pipeline.js'

import { destroyer } from './internal/streams/destroy.js'

import eos from './internal/streams/end-of-stream.js'

const internalBuffer = {}

import promises, { pipeline as _pipeline, finished } from './stream/promises.js'

import { isDisturbed, isErrored, isReadable } from './internal/streams/utils.js'

import { Stream } from'./internal/streams/legacy.js';

import { Readable } from './internal/streams/readable.js';
import { Writable } from './internal/streams/writable.js';
import { Duplex } from './internal/streams/duplex.js';
import { Transform } from './internal/streams/transform.js';
import { PassThrough } from './internal/streams/passthrough.js';

Stream.isDisturbed = isDisturbed
Stream.isErrored = isErrored
Stream.isReadable = isReadable
Stream.Readable = Readable;

for (const key of ObjectKeys(streamReturningOperators)) {
  const op = streamReturningOperators[key]

  function fn(...args) {
    if (new.target) {
      throw ERR_ILLEGAL_CONSTRUCTOR()
    }

    return Stream.Readable.from(ReflectApply(op, this, args))
  }

  ObjectDefineProperty(fn, 'name', {
    value: op.name
  })
  ObjectDefineProperty(fn, 'length', {
    value: op.length
  })
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    value: fn,
    enumerable: false,
    configurable: true,
    writable: true
  })
}

for (const key of ObjectKeys(promiseReturningOperators)) {
  const op = promiseReturningOperators[key]

  function fn(...args) {
    if (new.target) {
      throw ERR_ILLEGAL_CONSTRUCTOR()
    }

    return ReflectApply(op, this, args)
  }

  ObjectDefineProperty(fn, 'name', {
    value: op.name
  })
  ObjectDefineProperty(fn, 'length', {
    value: op.length
  })
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    value: fn,
    enumerable: false,
    configurable: true,
    writable: true
  })
}

Stream.Writable = Writable
Stream.Duplex = Duplex
Stream.Transform = Transform
Stream.PassThrough = PassThrough
Stream.pipeline = pipeline

import { addAbortSignal } from './internal/streams/add-abort-signal'

Stream.addAbortSignal = addAbortSignal
Stream.finished = eos
Stream.destroy = destroyer
Stream.compose = compose
ObjectDefineProperty(Stream, 'promises', {
  configurable: true,
  enumerable: true,

  get() {
    return promises
  }
})
ObjectDefineProperty(pipeline, customPromisify, {
  enumerable: true,

  get() {
    return _pipeline
  }
})
ObjectDefineProperty(eos, customPromisify, {
  enumerable: true,

  get() {
    return finished
  }
}) // Backwards-compat with node 0.4.x

Stream.Stream = Stream

Stream._isUint8Array = function isUint8Array(value) {
  return value instanceof Uint8Array
}

Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength)
}

export default Stream;